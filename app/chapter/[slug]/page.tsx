// app/chapter/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import ChapterClient from './ChapterClient';

interface ChapterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getChapter(slug: string) {
  const query = `
    *[_type == "chapter" && slug.current == $slug && isActive == true][0] {
      _id,
      title,
      chapterNumber,
      description,
      coverImage {
        asset-> {
          url,
          metadata
        }
      },
      contentType,
      "subject": subject-> {
        _id,
        name,
        code,
        "grade": grade-> {
          _id,
          title,
          level,
          "board": board-> {
            _id,
            name,
            code
          }
        }
      },
      "lessons": lessons[]-> {
        _id,
        title,
        slug,
        duration,
        order,
        publishedAt,
        "content": content[] {
          ...,
          _type == "image" => {
            ...,
            "url": asset->url
          },
          _type == "mediaObject" => {
            ...,
            "image": image.asset->url,
            "video": video.asset->url
          }
        }
      },
      // Fetch quizzes with all fields including questions
      "quizzes": quizzes[]-> {
        _id,
        title,
        slug,
        description,
        duration,
        passingScore,
        "questions": questions[] {
          question,
          questionType,
          options,
          correctAnswer,
          explanation,
          points
        },
        difficulty,
        order,
        isActive
      },
      order
    }
  `;
  
  const chapter = await client.fetch(query, { slug });
  
  console.log('=== CHAPTER FETCH DEBUG ===');
  console.log('Chapter Title:', chapter?.title);
  console.log('Lessons Count:', chapter?.lessons?.length);
  console.log('Quizzes Count:', chapter?.quizzes?.length);
  console.log('Quizzes:', JSON.stringify(chapter?.quizzes, null, 2));
  
  return chapter;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = await getChapter(slug);

  if (!chapter) {
    notFound();
  }

  return <ChapterClient chapter={chapter} />;
}