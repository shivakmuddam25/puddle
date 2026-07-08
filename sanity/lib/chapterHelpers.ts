// sanity/lib/chapterHelpers.ts
import { client } from './client'

export async function getAvailableChaptersForReference(subjectId: string, currentGradeLevel: number) {
  // Define grade range: 2 grades below and 2 grades above
  const lowerGrade = Math.max(1, currentGradeLevel - 2)
  const upperGrade = Math.min(12, currentGradeLevel + 2)
  
  const gradeRange = Array.from(
    { length: upperGrade - lowerGrade + 1 }, 
    (_, i) => lowerGrade + i
  )
  
  const query = `
    *[_type == "chapter" && 
      subject._ref == $subjectId && 
      subject->grade->level in $gradeRange &&
      contentType == "new" &&
      isActive == true
    ] | order(subject->grade->level asc, order asc) {
      _id,
      title,
      chapterNumber,
      "gradeLevel": subject->grade->level,
      "gradeTitle": subject->grade->title,
      "subject": subject->name,
      "board": subject->board->name,
      "lessonsCount": count(lessons),
      "quizzesCount": count(quizzes)
    }
  `
  
  return client.fetch(query, { subjectId, gradeRange })
}

export async function getFullChapterContent(chapterId: string) {
  const query = `
    *[_type == "chapter" && _id == $chapterId][0] {
      _id,
      title,
      chapterNumber,
      description,
      coverImage,
      contentType,
      "subject": subject-> {
        name,
        code,
        "grade": grade-> {
          title,
          level
        },
        "board": board-> {
          name,
          code
        }
      },
      "content": select(
        contentType == "reference" => referenceChapter-> {
          title,
          chapterNumber,
          lessons,
          quizzes
        },
        contentType == "new" => {
          lessons,
          quizzes
        }
      ),
      order,
      isActive
    }
  `
  
  return client.fetch(query, { chapterId })
}

export async function getFullSyllabus(boardId?: string) {
  const boardFilter = boardId ? `&& board._ref == $boardId` : ''
  const query = `
    *[_type == "board" ${boardFilter} && isActive == true] | order(order asc) {
      _id,
      name,
      code,
      description,
      "grades": *[_type == "grade" && board._ref == ^._id && isActive == true] | order(level asc) {
        _id,
        title,
        level,
        "subjects": *[_type == "subject" && grade._ref == ^._id && isActive == true] | order(order asc) {
          _id,
          name,
          code,
          description,
          "chapters": *[_type == "chapter" && subject._ref == ^._id && isActive == true] | order(order asc) {
            _id,
            title,
            chapterNumber,
            contentType,
            "lessonsCount": count(lessons),
            "quizzesCount": count(quizzes)
          }
        }
      }
    }
  `
  
  return client.fetch(query, boardId ? { boardId } : {})
}