// app/course/[slug]/page.tsx
import { client, urlFor } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, BookOpen, FileText, Clock, PlayCircle, Users, Award, Image as ImageIcon, Film } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCourse(slug: string) {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    subject,
    description,
    coverImage {
      asset-> {
        url,
        metadata { dimensions }
      }
    },
    lessons[]-> {
      _id,
      title,
      subject,
      publishedAt,
      slug,
      "excerpt": pt::text(body)[0..150] + "...",
      body[] {
        ...,
        _type,
        _type == "mediaObject" => {
          ...,
          "image": image.asset-> {
            url,
            mimeType,
            originalFilename
          },
          "video": video.asset-> {
            url,
            mimeType,
            originalFilename
          }
        }
      }
    }
  }`;
  
  return client.fetch(query, { slug });
}


// app/course/page.tsx
async function getFullSyllabus() {
  const query = `
    *[_type == "board"] | order(order) {
      _id,
      name,
      slug,
      "grades": *[_type == "grade" && board._ref == ^._id] | order(order) {
        _id,
        title,
        "subjects": *[_type == "subject" && grade._ref == ^._id] | order(order) {
          _id,
          name,
          slug,
          "chapters": *[_type == "chapter" && subject._ref == ^._id] | order(chapterNumber) {
            _id,
            title,
            chapterNumber,
            "lessons": *[_type == "post" && chapter._ref == ^._id] | order(order) {
              _id,
              title,
              slug,
              "subTopics": subTopics[] {
                title,
                duration
              }
            }
          }
        }
      }
    }
  `;
  
  return client.fetch(query);
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  // Calculate total media items
  const totalMediaItems = course.lessons?.reduce((acc: number, lesson: any) => {
    const mediaInLesson = lesson.body?.filter((item: any) => item._type === 'mediaObject').length || 0;
    return acc + mediaInLesson;
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-olive-800 font-serif">Puddle</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Back to Dashboard */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          href="/student-dashboard" 
          className="inline-flex items-center text-olive-700 hover:text-olive-900 font-medium group"
        >
          <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      {/* Course Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Cover Image */}
          {course.coverImage?.asset?.url ? (
            <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src={course.coverImage.asset.url}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {course.title}
                </h1>
                <div className="flex items-center gap-4 text-white/90">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
                    {course.subject || 'General'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-olive-500 to-emerald-500 rounded-xl p-8 mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
                {course.subject || 'General'}
              </span>
            </div>
          )}

          {/* Course Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                <p className="text-gray-700 leading-relaxed">
                  {course.description || 'No description available.'}
                </p>
              </div>

              {/* Lessons List */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
                {course.lessons && course.lessons.length > 0 ? (
                  <div className="space-y-4">
                    {course.lessons.map((lesson: any, index: number) => (
                      <Link
                        key={lesson._id}
                        href={`/post/${lesson.slug.current}`}
                        className="block p-6 border border-gray-200 rounded-lg hover:border-olive-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="flex items-center justify-center w-8 h-8 bg-olive-100 text-olive-700 rounded-full font-semibold text-sm">
                                {index + 1}
                              </span>
                              <h3 className="text-xl font-semibold text-gray-900">
                                {lesson.title}
                              </h3>
                            </div>
                            {lesson.excerpt && (
                              <p className="text-gray-600 text-sm ml-11 mb-3">
                                {lesson.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-4 ml-11 text-sm text-gray-500">
                              {lesson.publishedAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {new Date(lesson.publishedAt).toLocaleDateString()}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <FileText size={14} />
                                {lesson.body?.length || 0} sections
                              </span>
                            </div>
                          </div>
                          <PlayCircle className="text-olive-600 ml-4" size={24} />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No lessons available for this course yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <BookOpen size={20} className="text-olive-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Lessons</p>
                      <p className="font-medium">{course.lessons?.length || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <ImageIcon size={20} className="text-olive-600" />
                    <div>
                      <p className="text-sm text-gray-500">Media Items</p>
                      <p className="font-medium">{totalMediaItems}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={20} className="text-olive-600" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">Self-paced</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Users size={20} className="text-olive-600" />
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="font-medium capitalize">{course.subject || 'General'}</p>
                    </div>
                  </div>
                </div>

                {course.lessons && course.lessons.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href={`/post/${course.lessons[0].slug.current}`}
                      className="block w-full bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-center"
                    >
                      Start First Lesson
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}