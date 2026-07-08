// app/debug/chapter/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

interface DebugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getChapterDebug(slug: string) {
  const query = `
    *[_type == "chapter" && slug.current == $slug][0] {
      _id,
      title,
      "quizzesCount": count(quizzes),
      "quizzes": quizzes[]-> {
        _id,
        title,
        slug,
        description
      },
      "quizzesRaw": quizzes
    }
  `;
  return client.fetch(query, { slug });
}

export default async function DebugChapterPage({ params }: DebugPageProps) {
  const { slug } = await params;
  const chapter = await getChapterDebug(slug);

  if (!chapter) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Chapter not found</h1>
        <p>Slug: {slug}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug: {chapter.title}</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="font-bold">Quizzes Count: {chapter.quizzesCount || 0}</h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h2 className="font-bold mb-2">Quizzes Data:</h2>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(chapter.quizzes, null, 2)}
        </pre>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h2 className="font-bold mb-2">Raw Quizzes References:</h2>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(chapter.quizzesRaw, null, 2)}
        </pre>
      </div>
    </div>
  );
}