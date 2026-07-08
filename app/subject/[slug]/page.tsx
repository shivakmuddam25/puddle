// app/subject/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import SubjectClient from './SubjectClient';

interface SubjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getSubject(slug: string) {
  const query = `
    *[_type == "subject" && slug.current == $slug && isActive == true][0] {
      _id,
      name,
      code,
      description,
      color,
      icon,
      image {
        asset-> {
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      "grade": grade-> {
        _id,
        title,
        level,
        "board": board-> {
          _id,
          name,
          code
        }
      },
      "chapters": *[_type == "chapter" && subject._ref == ^._id && isActive == true] | order(order asc) {
        _id,
        title,
        chapterNumber,
        description,
        contentType,
        "lessons": lessons[]-> {
          _id,
          title,
          slug,
          duration,
          order,
          publishedAt,
          "subTopics": subTopics[] {
            title,
            duration,
            content
          },
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
            },
            _type == "mathFormula" => {
              ...,
              latex
            },
            _type == "chemicalFormula" => {
              ...,
              formula,
              name
            }
          }
        },
        "quizzesCount": count(quizzes)
      }
    }
  `;
  
  const subject = await client.fetch(query, { slug });
  console.log('Fetched subject:', subject?.name, 'for slug:', slug);
  return subject;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { slug } = await params;
  console.log('Subject slug from params:', slug);
  
  const subject = await getSubject(slug);

  if (!subject) {
    console.log('Subject not found for slug:', slug);
    notFound();
  }

  return <SubjectClient subject={subject} />;
}