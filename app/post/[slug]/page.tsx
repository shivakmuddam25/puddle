// app/post/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import PostClient from './PostClient';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    subject,
    publishedAt,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      },
      caption,
      alt
    },
    body[] {
      ...,
      _type,
      // Handle mediaObject specially
      _type == "mediaObject" => {
        ...,
        // Handle image asset
        "image": image.asset-> {
          _id,
          url,
          mimeType,
          originalFilename,
          metadata {
            dimensions
          }
        },
        // Handle video asset
        "video": video.asset-> {
          _id,
          url,
          mimeType,
          originalFilename
        },
        caption,
        mediaType
      },
      // For other types, just get asset if it exists
      asset->
    }
  }`;
  
  return client.fetch(query, { slug });
}

async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    subject,
    publishedAt,
    slug
  }`;
  
  return client.fetch(query);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPost(slug),
    getAllPosts()
  ]);

  if (!post) {
    notFound();
  }

  // Separate media items by type
  const mediaItems = post.body?.filter((item: any) => 
    item._type === 'mediaObject'
  ) || [];

  // Filter out media objects from text content
  const textContent = post.body?.filter((item: any) => 
    item._type !== 'mediaObject'
  ) || [];

  return (
    <PostClient 
      post={post}
      allPosts={allPosts}
      mediaItems={mediaItems}
      textContent={textContent}
    />
  );
}