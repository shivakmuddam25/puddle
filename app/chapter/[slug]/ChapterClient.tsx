// app/chapter/[slug]/ChapterClient.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Clock,
  FileText,
  AlertCircle,
  Video,
  Download,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  HelpCircle,
  Award
} from 'lucide-react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/client';
import UserProfile from '@/components/UserProfile';

interface Lesson {
  _id?: string;
  title: string;
  slug?: { current: string };
  content?: any[];
  duration?: number;
  order?: number;
  publishedAt?: string;
}

interface Quiz {
  _id?: string;
  title: string;
  slug?: { current: string };
  description?: string;
  questions?: any[];
  duration?: number;
  passingScore?: number;
  difficulty?: string;
  order?: number;
  isActive?: boolean;
}

interface Chapter {
  _id: string;
  title: string;
  chapterNumber: string;
  description: string;
  coverImage?: any;
  contentType: string;
  subject: {
    _id: string;
    name: string;
    code: string;
    grade: {
      _id: string;
      title: string;
      level: number;
    };
    board: {
      _id: string;
      name: string;
      code: string;
    };
  };
  lessons: Lesson[];
  quizzes: Quiz[];
  referencedFrom?: any[];
}

export default function ChapterClient({ chapter }: { chapter: Chapter }) {
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState<Set<string>>(new Set());
  const [userName, setUserName] = useState('Student');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const name = localStorage.getItem('studentName') || localStorage.getItem('userName') || 'Student';
    const email = localStorage.getItem('studentEmail') || localStorage.getItem('userEmail') || '';
    setUserName(name);
    setUserEmail(email);
  }, []);

  // Auto-select first lesson or quiz
  useEffect(() => {
    console.log('Chapter data received:', {
      title: chapter?.title,
      lessonsCount: chapter?.lessons?.length,
      quizzesCount: chapter?.quizzes?.length,
      quizzes: chapter?.quizzes
    });
    
    if (!selectedLesson && !selectedQuiz) {
      if (chapter.lessons && chapter.lessons.length > 0) {
        setSelectedLesson(chapter.lessons[0]);
        setIsPlaying(true);
      } else if (chapter.quizzes && chapter.quizzes.length > 0) {
        setSelectedQuiz(chapter.quizzes[0]);
        setIsPlaying(true);
      }
    }
    setExpandedChapter(new Set([chapter._id]));
  }, [chapter]);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Chapter not found</h2>
          <Link href="/student-dashboard" className="mt-4 inline-flex items-center text-olive-600">
            <ChevronLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const hasLessons = chapter.lessons && chapter.lessons.length > 0;
  const hasQuizzes = chapter.quizzes && chapter.quizzes.length > 0;

  // Extract video from lesson content
  const extractVideoFromLesson = (lesson: Lesson) => {
    if (!lesson.content) return null;
    for (const item of lesson.content) {
      if (item._type === 'mediaObject' && item.mediaType === 'video' && item.video?.url) {
        return {
          url: item.video.url,
          caption: item.caption
        };
      }
    }
    return null;
  };

  const lessonHasVideo = (lesson: Lesson) => {
    return extractVideoFromLesson(lesson) !== null;
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setSelectedQuiz(null);
    setIsPlaying(true);
    if (isMobile) setSidebarOpen(false);
  };

  const handleQuizClick = (quiz: Quiz) => {
    console.log('Quiz clicked:', quiz);
    setSelectedQuiz(quiz);
    setSelectedLesson(null);
    setIsPlaying(true);
    if (isMobile) setSidebarOpen(false);
  };

  const handleBackToMenu = () => {
    setSelectedLesson(null);
    setSelectedQuiz(null);
    setIsPlaying(false);
  };

  const handleBackToDashboard = () => {
    router.push('/student-dashboard');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Start Quiz - Navigate to quiz page
  const handleStartQuiz = (quiz: Quiz) => {
    if (quiz.slug?.current) {
      router.push(`/quiz/${quiz.slug.current}`);
    } else {
      alert('Quiz not available yet. Please check back later.');
    }
  };

  // Portable text components for rendering lesson content
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
    marks: {
      link: ({ children, value }: any) => (
        <a href={value?.href} className="text-olive-600 hover:underline">{children}</a>
      ),
    },
    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null;
        return (
          <div className="my-6 flex justify-center">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <img
                src={urlFor(value).width(800).url()}
                alt={value.alt || 'Image'}
                className="rounded-lg max-w-full h-auto"
              />
              {value.caption && (
                <p className="text-sm text-gray-500 mt-2 text-center italic">{value.caption}</p>
              )}
            </div>
          </div>
        );
      },
      mediaObject: ({ value }: any) => {
        if (!value) return null;
        
        if (value.mediaType === 'video' && value.video?.url) {
          return (
            <div className="my-6">
              <video 
                src={value.video.url}
                controls
                className="w-full rounded-lg shadow-lg"
              />
              {value.caption && (
                <p className="text-sm text-gray-500 mt-2 text-center italic">{value.caption}</p>
              )}
              <a 
                href={value.video.url}
                download
                className="inline-flex items-center gap-1 text-sm text-olive-600 mt-2 hover:underline"
              >
                <Download size={14} />
                Download Video
              </a>
            </div>
          );
        }
        
        if (value.image?.url) {
          return (
            <div className="my-6">
              <img
                src={value.image.url}
                alt={value.caption || 'Image'}
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
              {value.caption && (
                <p className="text-sm text-gray-500 mt-2 text-center italic">{value.caption}</p>
              )}
            </div>
          );
        }
        
        return null;
      },
      mathFormula: ({ value }: any) => {
        if (!value?.latex) return null;
        return (
          <div className="my-4 p-4 bg-gray-50 rounded-lg font-mono border border-gray-200 overflow-x-auto">
            <p className="text-gray-700">{value.latex}</p>
          </div>
        );
      },
      chemicalFormula: ({ value }: any) => {
        if (!value?.formula) return null;
        return (
          <div className="my-4 p-4 bg-gray-50 rounded-lg font-mono border border-gray-200">
            <p className="text-gray-700">{value.formula}</p>
            {value.name && (
              <p className="text-sm text-gray-500 mt-1">{value.name}</p>
            )}
          </div>
        );
      },
    },
  };

  // Render quiz content view
  const renderQuizContent = () => {
    if (!selectedQuiz) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{selectedQuiz.title}</h1>
          {selectedQuiz.duration && (
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              {selectedQuiz.duration} min
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {chapter.subject.grade.title} • {chapter.subject.board.name}
          </span>
          <span>•</span>
          <span>{chapter.subject.name}</span>
          <span>•</span>
          <span>{chapter.title}</span>
        </div>

        {selectedQuiz.description && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">{selectedQuiz.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <HelpCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{selectedQuiz.questions?.length || 0}</p>
            <p className="text-sm text-gray-600">Questions</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{selectedQuiz.duration || 'N/A'}</p>
            <p className="text-sm text-gray-600">Minutes</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{selectedQuiz.passingScore || 40}%</p>
            <p className="text-sm text-gray-600">Passing Score</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => handleStartQuiz(selectedQuiz)}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-lg font-semibold"
          >
            <PlayCircle size={20} />
            Start Quiz
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-start">
          <button
            onClick={handleBackToMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
            Back to Menu
          </button>
        </div>
      </div>
    );
  };

  // Render lesson content view
  const renderLessonContent = () => {
    if (!selectedLesson) return null;

    const video = extractVideoFromLesson(selectedLesson);

    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`${video ? 'lg:w-2/3' : 'w-full'}`}>
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedLesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              {selectedLesson.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedLesson.duration} min
                </span>
              )}
              {lessonHasVideo(selectedLesson) && (
                <span className="flex items-center gap-1 text-purple-600">
                  <Video size={14} />
                  Includes Video
                </span>
              )}
            </div>

            {selectedLesson.content && selectedLesson.content.length > 0 ? (
              <div className="prose prose-lg max-w-none">
                <PortableText 
                  value={selectedLesson.content} 
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <p className="text-gray-600">No content available for this lesson yet.</p>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleBackToMenu}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
                Back to Menu
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700">
                Mark Complete
                <CheckCircle size={16} />
              </button>
            </div>
          </div>
        </div>

        {video && (
          <div className="lg:w-1/3">
            <div className="sticky top-20">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-900">
                  <video 
                    src={video.url}
                    controls
                    className="w-full"
                    controlsList="nodownload"
                  />
                </div>
                <div className="p-4">
                  {video.caption && <p className="text-sm text-gray-600 italic">{video.caption}</p>}
                  <a href={video.url} download className="inline-flex items-center gap-2 mt-3 text-sm text-olive-600">
                    <Download size={14} /> Download Video
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100"
                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
              </button>
              <Link href="/student-dashboard" className="text-xl font-bold text-olive-800">
                Puddle
              </Link>
              <button
                onClick={handleBackToDashboard}
                className="hidden lg:flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <Home size={16} />
                Dashboard
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {chapter.subject.grade.title} | {chapter.subject.board.name}
              </span>
              <UserProfile userName={userName} userEmail={userEmail} />
            </div>
          </div>
        </div>
      </nav>

      {/* Chapter Header */}
      <div className="bg-gradient-to-r from-olive-700 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl">
            <div className="flex items-center gap-2 text-sm mb-4 flex-wrap">
              <span className="bg-white/20 px-3 py-1 rounded-full">{chapter.subject.board.name}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">{chapter.subject.grade.title}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">{chapter.subject.name}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {chapter.chapterNumber ? `Ch ${chapter.chapterNumber}: ` : ''}{chapter.title}
            </h1>
            <p className="text-white/90">{chapter.description || 'Explore this chapter to learn key concepts.'}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className={`
            lg:sticky lg:top-20 transition-all duration-300
            ${sidebarOpen ? 'lg:w-80' : 'lg:w-16'}
            flex-shrink-0
            ${sidebarOpen ? 'block' : 'hidden lg:block'}
            ${isMobile && sidebarOpen ? 'fixed inset-0 z-40 bg-white p-6 overflow-y-auto' : ''}
          `}>
            <div className="bg-white rounded-xl shadow-sm">
              {sidebarOpen ? (
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">{chapter.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {chapter.lessons?.length || 0} lessons • {chapter.quizzes?.length || 0} quizzes
                  </p>
                </div>
              ) : (
                <div className="p-3 border-b border-gray-200 text-center">
                  <BookOpen size={20} className="text-olive-600 mx-auto" />
                </div>
              )}

              <div className="py-2">
                <div className="px-2">
                  {/* Chapter Title */}
                  <button
                    onClick={() => setExpandedChapter(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(chapter._id)) newSet.delete(chapter._id);
                      else newSet.add(chapter._id);
                      return newSet;
                    })}
                    className={`w-full flex items-center justify-between p-3 rounded-lg ${!sidebarOpen && 'justify-center'}`}
                    title={!sidebarOpen ? chapter.title : undefined}
                  >
                    {sidebarOpen ? (
                      <>
                        <div className="flex items-center gap-2">
                          <BookOpen size={18} className="text-olive-600" />
                          <span className="font-medium text-sm">{chapter.title}</span>
                        </div>
                        <ChevronDown size={16} className={expandedChapter.has(chapter._id) ? 'rotate-180' : ''} />
                      </>
                    ) : (
                      <div className="relative group">
                        <BookOpen size={18} className="text-olive-600" />
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block z-50">
                          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {chapter.title}
                          </div>
                        </div>
                      </div>
                    )}
                  </button>

                  {sidebarOpen && expandedChapter.has(chapter._id) && (
                    <div className="ml-4 mt-1 space-y-2">
                      {/* Lessons Section */}
                      {hasLessons && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <BookOpen size={12} />
                            <span>Lessons</span>
                          </div>
                          {chapter.lessons?.map((lesson: Lesson, index: number) => (
                            <button
                              key={lesson._id || index}
                              onClick={() => handleLessonClick(lesson)}
                              className={`w-full text-left p-2 rounded-lg transition-all ${
                                selectedLesson?._id === lesson._id
                                  ? 'bg-olive-100 text-olive-700 border-l-2 border-olive-500'
                                  : 'hover:bg-gray-50 text-gray-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <PlayCircle size={14} />
                                  <span className="text-sm">{index + 1}. {lesson.title}</span>
                                </div>
                                {lessonHasVideo(lesson) && <Video size={12} className="text-purple-500" />}
                              </div>
                              {lesson.duration && (
                                <div className="text-xs text-gray-400 ml-6 mt-0.5">{lesson.duration} min</div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Quizzes Section */}
                      {hasQuizzes && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-100 pt-3">
                            <HelpCircle size={12} />
                            <span>Quizzes</span>
                          </div>
                          {chapter.quizzes?.map((quiz: Quiz, index: number) => (
                            <button
                              key={quiz._id || index}
                              onClick={() => handleQuizClick(quiz)}
                              className={`w-full text-left p-2 rounded-lg transition-all ${
                                selectedQuiz?._id === quiz._id
                                  ? 'bg-purple-100 text-purple-700 border-l-2 border-purple-500'
                                  : 'hover:bg-gray-50 text-gray-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <HelpCircle size={14} />
                                  <span className="text-sm">{index + 1}. {quiz.title}</span>
                                </div>
                                {quiz.duration && <Clock size={12} className="text-gray-400" />}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400 ml-6 mt-0.5">
                                {quiz.questions?.length || 0} questions
                                {quiz.passingScore && <span>• Passing: {quiz.passingScore}%</span>}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {sidebarOpen && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Lessons</span>
                    <span className="font-medium text-gray-900">{chapter.lessons?.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Total Quizzes</span>
                    <span className="font-medium text-gray-900">{chapter.quizzes?.length || 0}</span>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {selectedLesson && renderLessonContent()}
            {selectedQuiz && renderQuizContent()}
            {!selectedLesson && !selectedQuiz && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{chapter.title}</h2>
                <p className="text-gray-600 mb-6">Select a lesson or quiz from the menu to start learning.</p>
                <div className="flex gap-4 justify-center">
                  {hasLessons && (
                    <button
                      onClick={() => chapter.lessons[0] && handleLessonClick(chapter.lessons[0])}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700"
                    >
                      <PlayCircle size={20} />
                      Start First Lesson
                    </button>
                  )}
                  {hasQuizzes && (
                    <button
                      onClick={() => chapter.quizzes[0] && handleQuizClick(chapter.quizzes[0])}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      <HelpCircle size={20} />
                      Start First Quiz
                    </button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}