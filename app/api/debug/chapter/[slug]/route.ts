// app/api/debug/chapter/[slug]/route.ts
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  const query = `
    *[_type == "chapter" && slug.current == $slug][0] {
      _id,
      title,
      "quizzes": quizzes[]-> {
        _id,
        title,
        slug,
        description
      },
      "quizzesRaw": quizzes
    }
  `;
  
  const chapter = await client.fetch(query, { slug });
  
  return NextResponse.json({
    chapter: chapter,
    quizzesCount: chapter?.quizzes?.length || 0,
    rawQuizzesCount: chapter?.quizzesRaw?.length || 0
  });
}