// app/quiz/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import QuizClient from './QuizClient';

interface QuizPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getQuiz(slug: string) {
  const query = `
    *[_type == "quiz" && slug.current == $slug && isActive == true][0] {
      _id,
      title,
      description,
      duration,
      passingScore,
      questions[] {
        question,
        questionType,
        options,
        correctAnswer,
        explanation,
        points
      },
      difficulty
    }
  `;
  return client.fetch(query, { slug });
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = await getQuiz(slug);

  if (!quiz) {
    notFound();
  }

  return <QuizClient quiz={quiz} />;
}