// app/post/[slug]/PostClient.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Calendar, 
  Image as ImageIcon, 
  Film, 
  Download, 
  BookOpen, 
  ChevronRight,
  Video
} from 'lucide-react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';

// Custom components for portable text - handles text content only
const textComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>,
    normal: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-olive-500 pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-olive-600 hover:underline">
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  types: {
    mathFormula: ({ value }: any) => (
      <div className="my-4 p-4 bg-gray-50 rounded-lg font-mono border border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Math Formula</p>
        <p className="text-gray-700 text-lg">{value.latex || value.formula || 'Formula'}</p>
      </div>
    ),
    
    chemicalFormula: ({ value }: any) => (
      <div className="my-4 p-4 bg-gray-50 rounded-lg font-mono border border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Chemical Formula</p>
        <p className="text-gray-700 text-lg">{value.formula || 'Formula'}</p>
      </div>
    ),
    
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      
      return (
        <div className="my-8">
          <div className="relative w-full h-auto min-h-[300px] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(800).height(600).url()}
              alt={value.alt || 'Image'}
              width={800}
              height={600}
              className="object-contain w-full h-auto"
            />
          </div>
          {value.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center italic">{value.caption}</p>
          )}
        </div>
      );
    },
  },
};

// Video Gallery Component
const VideoGallery = ({ mediaItems }: { mediaItems: any[] }) => {
  const videos = mediaItems.filter(item => 
    item.mediaType === 'video' && item.video?.url
  );

  if (!videos || videos.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Film size={20} className="text-blue-600" />
        Videos ({videos.length})
      </h2>
      
      <div className="space-y-6">
        {videos.map((item: any, index: number) => {
          const { video, caption } = item;
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="relative bg-black aspect-video">
                <video 
                  src={video.url}
                  controls
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4">
                {caption && (
                  <p className="text-gray-700 text-sm mb-2">{caption}</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.originalFilename || 'Video file'}</span>
                  <a 
                    href={video.url}
                    download
                    className="inline-flex items-center gap-1 text-olive-600 hover:text-olive-800"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Collapsible Course Navigation Component
const CourseNavigation = ({ 
  posts, 
  currentPostId,
  currentSubject 
}: { 
  posts: any[], 
  currentPostId: string,
  currentSubject: string 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Group posts by subject
  const postsBySubject = posts.reduce((acc, post) => {
    const subject = post.subject || 'Uncategorized';
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(post);
    return acc;
  }, {} as Record<string, any[]>);

  // Handle navigation
  const handleNavigation = (slug: string) => {
    router.push(`/post/${slug}`);
  };

  if (isCollapsed) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sticky top-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-full flex items-center justify-center text-olive-600 hover:text-olive-800 transition-colors"
          title="Expand menu"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20 relative">
      <button
        onClick={() => setIsCollapsed(true)}
        className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
        title="Collapse menu"
      >
        <ChevronLeft size={16} className="text-gray-600" />
      </button>
      
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-olive-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
      </div>
      
      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {Object.entries(postsBySubject).map(([subject, subjectPosts]) => (
          <div key={subject}>
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-olive-500 rounded-full"></span>
              {subject} ({subjectPosts.length})
            </h3>
            <ul className="space-y-2">
              {subjectPosts.map((post) => (
                <li key={post._id}>
                  <button
                    onClick={() => handleNavigation(post.slug.current)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      post._id === currentPostId
                        ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white shadow-md'
                        : 'hover:bg-olive-50 text-gray-700'
                    }`}
                  >
                    <div className="text-sm font-medium">{post.title}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

interface PostClientProps {
  post: any;
  allPosts: any[];
  mediaItems: any[];
  textContent: any[];
}

export default function PostClient({ post, allPosts, mediaItems, textContent }: PostClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-olive-800 font-serif">Puddle</span>
            </Link>
            <Link 
              href="/student-dashboard" 
              className="text-sm text-gray-600 hover:text-olive-600 flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Dynamic Layout with Collapsible Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-olive-600 mb-4">
              <span className="bg-olive-100 px-3 py-1 rounded-full">
                {post.subject || 'General'}
              </span>
              {post.publishedAt && (
                <span className="flex items-center gap-1 text-gray-500">
                  <Calendar size={14} />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
          </div>

          {/* Three Column Layout with Collapsible Left Menu */}
          <div className="flex gap-8">
            {/* Left Sidebar - Collapsible */}
            <div className="transition-all duration-300 ease-in-out">
              <CourseNavigation 
                posts={allPosts} 
                currentPostId={post._id}
                currentSubject={post.subject || 'General'}
              />
            </div>

            {/* Main Content Area - Expands when left menu is collapsed */}
            <div className="flex-1 min-w-0">
              {/* Featured Image (if exists) */}
              {post.image && post.image.asset && (
                <div className="mb-8">
                  <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(post.image).width(1200).height(400).url()}
                      alt={post.image.alt || post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {post.image.caption && (
                    <p className="text-sm text-gray-500 mt-2 text-center">{post.image.caption}</p>
                  )}
                </div>
              )}

              {/* Text Content */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                {textContent.length > 0 ? (
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={textContent} components={textComponents} />
                  </div>
                ) : (
                  <p className="text-gray-600">No text content available for this post.</p>
                )}
              </div>
            </div>

            {/* Right Sidebar - Videos Only */}
            {mediaItems.filter((item: any) => item.mediaType === 'video' && item.video?.url).length > 0 && (
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-20">
                  <VideoGallery mediaItems={mediaItems} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}