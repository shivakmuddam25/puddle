"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Calendar, 
  Film, 
  Download, 
  BookOpen, 
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/client';

// Custom Lightbox Component
const CustomLightbox = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onPrev, 
  onNext 
}: any) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10 transition-all"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>
      
      <button
        onClick={onPrev}
        className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 disabled:opacity-30 z-10 transition-all"
        disabled={currentIndex === 0}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      <div className="max-w-7xl max-h-[90vh] mx-4">
        <img
          src={images[currentIndex]?.src}
          alt={images[currentIndex]?.alt || 'Image'}
          className="max-w-full max-h-[80vh] object-contain"
        />
        {images[currentIndex]?.caption && (
          <p className="text-white text-center mt-4 italic">{images[currentIndex].caption}</p>
        )}
      </div>
      
      <button
        onClick={onNext}
        className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 disabled:opacity-30 z-10 transition-all"
        disabled={currentIndex === images.length - 1}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Video Gallery Component (for right sidebar)
const VideoGallery = ({ mediaItems }: { mediaItems: any[] }) => {
  if (!mediaItems || !Array.isArray(mediaItems)) return null;
  
  const videos = mediaItems.filter((item: any) => 
    item?.mediaType === 'video' && item?.video?.url
  );

  if (!videos || videos.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Film size={20} className="text-blue-600" />
        Videos ({videos.length})
      </h2>
      {videos.map((item: any, index: number) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <video 
            src={item.video.url} 
            controls 
            className="w-full"
            style={{ maxHeight: '200px' }}
          />
          <div className="p-4">
            {item.caption && (
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{item.caption}</p>
            )}
            <a 
              href={item.video.url} 
              download 
              className="text-sm text-olive-600 hover:underline flex items-center gap-1"
            >
              <Download size={14} />
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

// Course Navigation Component
const CourseNavigation = ({ posts, currentPostId }: { posts: any[], currentPostId: string }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  if (!posts || !Array.isArray(posts)) return null;

  if (isCollapsed) {
    return (
      <button 
        onClick={() => setIsCollapsed(false)} 
        className="bg-white rounded-full p-3 shadow-lg sticky top-20 hover:shadow-xl transition-all"
        aria-label="Expand menu"
        title="Expand menu"
      >
        <ChevronRight size={20} className="text-olive-600" />
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20 relative w-64">
      <button
        onClick={() => setIsCollapsed(true)}
        className="absolute -right-3 top-6 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow"
        aria-label="Collapse menu"
        title="Collapse menu"
      >
        <ChevronLeft size={14} className="text-gray-600" />
      </button>
      
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <BookOpen size={20} className="text-olive-600" />
        Course Content
      </h2>
      
      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {posts.map((post) => (
          <button
            key={post._id}
            onClick={() => router.push(`/post/${post.slug.current}`)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              post._id === currentPostId
                ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white shadow-md'
                : 'hover:bg-olive-50 text-gray-700'
            }`}
          >
            <div className="text-sm font-medium line-clamp-2">{post.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Image Component
const ImageComponent = ({ value, images, openLightbox }: any) => {
  if (!value?.asset) return null;
  
  const imageUrl = urlFor(value).width(1200).url();
  const imageIndex = images.findIndex((img: any) => img.src === imageUrl);
  
  return (
    <div className="my-8 flex justify-center">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 inline-block max-w-full relative group">
        <img
          src={urlFor(value).width(800).fit('max').url()}
          alt={value.alt || 'Image'}
          className="rounded-lg cursor-pointer transition-transform group-hover:scale-[1.02]"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            display: 'block',
            margin: '0 auto'
          }}
          onClick={() => openLightbox(imageIndex >= 0 ? imageIndex : 0)}
        />
        <button
          onClick={() => openLightbox(imageIndex >= 0 ? imageIndex : 0)}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
          aria-label="View fullscreen"
        >
          <Maximize2 size={16} />
        </button>
        {value.caption && (
          <p className="text-sm text-gray-600 mt-2 text-center italic">{value.caption}</p>
        )}
      </div>
    </div>
  );
};

// Media Object Component
const MediaObjectComponent = ({ value, images, openLightbox }: any) => {
  if (!value) return null;
  
  // Handle video
  if (value.mediaType === 'video' && value.video?.url) {
    return (
      <div className="my-8 flex justify-center">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 inline-block max-w-full">
          <video 
            src={value.video.url}
            controls
            className="rounded-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">{value.caption}</p>
          )}
        </div>
      </div>
    );
  }
  
  // Handle image in mediaObject
  if (value.image?.url) {
    const imageIndex = images.findIndex((img: any) => img.src === value.image.url);
    
    return (
      <div className="my-8 flex justify-center">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 inline-block max-w-full relative group">
          <img
            src={value.image.url}
            alt={value.caption || 'Image'}
            className="rounded-lg cursor-pointer transition-transform group-hover:scale-[1.02]"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
            onClick={() => openLightbox(imageIndex >= 0 ? imageIndex : 0)}
          />
          <button
            onClick={() => openLightbox(imageIndex >= 0 ? imageIndex : 0)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
            aria-label="View fullscreen"
          >
            <Maximize2 size={16} />
          </button>
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">{value.caption}</p>
          )}
        </div>
      </div>
    );
  }
  
  return null;
};

// Math Formula Component
const MathFormulaComponent = ({ value }: any) => {
  if (!value) return null;
  return (
    <div className="my-4 p-4 bg-gray-50 rounded-lg font-mono border border-gray-200">
      <p className="text-gray-700">{value.latex || value.formula || 'Formula'}</p>
    </div>
  );
};

// Chemical Formula Component
const ChemicalFormulaComponent = ({ value }: any) => {
  if (!value) return null;
  return (
    <div className="my-4 p-4 bg-gray-50 rounded-lg font-mono border border-gray-200">
      <p className="text-gray-700">{value.formula || 'Formula'}</p>
    </div>
  );
};

export default function PostClient({ post, allPosts, mediaItems, textContent }: any) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!post) return null;
  
  // Collect all images for the lightbox
  const allImages: any[] = [];
  
  // Add featured image if exists
  if (post.image?.asset) {
    allImages.push({
      src: urlFor(post.image).width(1200).url(),
      caption: post.image.caption,
      alt: post.image.alt || post.title
    });
  }
  
  // Add images from body
  textContent?.forEach((item: any) => {
    if (item._type === 'image' && item.asset) {
      allImages.push({
        src: urlFor(item).width(1200).url(),
        caption: item.caption,
        alt: item.alt || 'Image'
      });
    }
    if (item._type === 'mediaObject' && item.image?.url) {
      allImages.push({
        src: item.image.url,
        caption: item.caption,
        alt: 'Image'
      });
    }
  });
  
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  const goToPrevious = () => {
    setCurrentImageIndex(Math.max(0, currentImageIndex - 1));
  };
  
  const goToNext = () => {
    setCurrentImageIndex(Math.min(allImages.length - 1, currentImageIndex + 1));
  };
  
  // Filter videos for right sidebar
  const videos = mediaItems?.filter((item: any) => 
    item?.mediaType === 'video' && item?.video?.url
  ) || [];

  // Define portable text components as a plain object
  const portableTextComponents = {
    block: {
      h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>,
      normal: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
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
        if (!value?.href) return children;
        return (
          <a href={value.href} className="text-olive-600 hover:underline">{children}</a>
        );
      },
    },
    types: {
      image: (props: any) => <ImageComponent {...props} images={allImages} openLightbox={openLightbox} />,
      mediaObject: (props: any) => <MediaObjectComponent {...props} images={allImages} openLightbox={openLightbox} />,
      mathFormula: (props: any) => <MathFormulaComponent {...props} />,
      chemicalFormula: (props: any) => <ChemicalFormulaComponent {...props} />,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Custom Lightbox */}
      <CustomLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages}
        currentIndex={currentImageIndex}
        onPrev={goToPrevious}
        onNext={goToNext}
      />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-olive-800 font-serif">Puddle</Link>
            <Link 
              href="/student-dashboard" 
              className="text-sm text-gray-600 hover:text-olive-600 flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm mb-4">
              <span className="bg-olive-100 px-3 py-1 rounded-full text-olive-700">
                {post.subject || 'General'}
              </span>
              {post.publishedAt && (
                <span className="text-gray-500 flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          </div>

          {/* Responsive Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Collapsible */}
            <div className="lg:w-auto">
              <CourseNavigation posts={allPosts || []} currentPostId={post._id} />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-3xl order-2 lg:order-1">
              {/* Featured Image */}
              {post.image?.asset && (
                <div className="mb-8 flex justify-center">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 inline-block max-w-full relative group">
                    <img
                      src={urlFor(post.image).width(800).fit('max').url()}
                      alt={post.image.alt || post.title}
                      className="rounded-lg cursor-pointer transition-transform group-hover:scale-[1.02]"
                      style={{ 
                        maxWidth: '100%', 
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto'
                      }}
                      onClick={() => {
                        const index = allImages.findIndex((img: any) => 
                          img.src === urlFor(post.image).width(1200).url()
                        );
                        openLightbox(index >= 0 ? index : 0);
                      }}
                    />
                    <button
                      onClick={() => {
                        const index = allImages.findIndex((img: any) => 
                          img.src === urlFor(post.image).width(1200).url()
                        );
                        openLightbox(index >= 0 ? index : 0);
                      }}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
                      aria-label="View fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>
                    {post.image.caption && (
                      <p className="text-sm text-gray-500 mt-2 text-center italic">{post.image.caption}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Text Content */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                {textContent && textContent.length > 0 ? (
                  <div className="prose prose-lg max-w-none">
                    <PortableText 
                      value={textContent} 
                      components={portableTextComponents} 
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">No content available.</p>
                )}
              </div>
            </div>

            {/* Right Sidebar - Videos Only - Moves to bottom on mobile */}
            {videos.length > 0 && (
              <div className={`${isMobile ? 'order-3 mt-8' : 'lg:w-80 flex-shrink-0 order-3 lg:order-2'}`}>
                <div className={isMobile ? '' : 'sticky top-20'}>
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