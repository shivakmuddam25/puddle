// app/api/sanity-test/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: NextRequest) {
  try {
    const { gradeTitle, boardId } = await req.json();
    
    console.log('Sanity test - Fetching for:', { gradeTitle, boardId });
    
    // First, check if board exists
    const boardQuery = `*[_type == "board" && _id == $boardId && isActive == true][0] { _id, name, code }`;
    const board = await client.fetch(boardQuery, { boardId });
    console.log('Board found:', board);
    
    // If board not found, get all boards
    if (!board) {
      const allBoardsQuery = `*[_type == "board" && isActive == true] { _id, name, code }`;
      const allBoards = await client.fetch(allBoardsQuery);
      return NextResponse.json({
        success: false,
        error: 'Board not found',
        boardId,
        gradeTitle,
        availableBoards: allBoards.map((b: any) => ({ id: b._id, name: b.name })),
        message: `Board with ID "${boardId}" not found in Sanity`
      });
    }
    
    // Check if grade exists for this board
    const gradeQuery = `*[_type == "grade" && title == $gradeTitle && board._ref == $boardId && isActive == true][0] { _id, title, level }`;
    const grade = await client.fetch(gradeQuery, { gradeTitle, boardId });
    console.log('Grade found:', grade);
    
    if (!grade) {
      // Get all available grades for this board
      const availableGradesQuery = `*[_type == "grade" && board._ref == $boardId && isActive == true] { title, level } | order(level asc)`;
      const availableGrades = await client.fetch(availableGradesQuery, { boardId });
      
      return NextResponse.json({
        success: false,
        error: 'Grade not found',
        gradeTitle,
        boardId,
        board: { id: board._id, name: board.name },
        availableGrades: availableGrades.map((g: any) => g.title),
        message: `Grade "${gradeTitle}" not found for board "${board.name}". Available grades: ${availableGrades.map((g: any) => g.title).join(', ')}`
      });
    }
    
    // Fetch subjects
    const subjectsQuery = `
      *[_type == "subject" && grade._ref == $gradeId && isActive == true] | order(order asc) {
        _id,
        name,
        code,
        description,
        color,
        "chaptersCount": count(*[_type == "chapter" && subject._ref == ^._id && isActive == true]),
        "totalLessons": count(*[_type == "chapter" && subject._ref == ^._id && isActive == true].lessons[])
      }
    `;
    const subjects = await client.fetch(subjectsQuery, { gradeId: grade._id });
    
    console.log(`Found ${subjects.length} subjects for ${gradeTitle}`);
    
    return NextResponse.json({
      success: true,
      board: {
        id: board._id,
        name: board.name,
        code: board.code
      },
      grade: {
        id: grade._id,
        title: grade.title,
        level: grade.level
      },
      subjectsCount: subjects.length,
      subjects: subjects.map((s: any) => ({ 
        id: s._id,
        name: s.name, 
        code: s.code,
        chapters: s.chaptersCount,
        lessons: s.totalLessons
      })),
      message: `Found ${subjects.length} subjects for ${gradeTitle} in ${board.name}`
    });
    
  } catch (error) {
    console.error('Sanity test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}