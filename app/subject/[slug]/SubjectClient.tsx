// app/subject/[slug]/SubjectClient.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  PlayCircle, 
  Clock,
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
  ShieldAlert,
  CheckCircle,
  FileText,
  Layers
} from 'lucide-react';
import Image from 'next/image';
import UserProfile from '@/components/UserProfile';

interface SubTopic {
  title: string;
  duration?: number;
  content?: any[];
}

interface Lesson {
  _id?: string;
  title: string;
  slug?: { current: string };
  content?: any[];
  subTopics?: SubTopic[];
  duration?: number;
  order?: number;
  publishedAt?: string;
}

interface Chapter {
  _id: string;
  title: string;
  chapterNumber: string;
  description?: string;
  contentType: string;
  lessons: Lesson[];
  quizzesCount: number;
}

interface Subject {
  _id: string;
  name: string;
  code: string;
  description?: string;
  color?: string;
  icon?: any;
  image?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        }
      }
    };
    alt?: string;
  };
  grade: {
    _id: string;
    title: string;
    level: number;
    board: {
      _id: string;
      name: string;
      code: string;
    };
  };
  chapters: Chapter[];
}

export default function SubjectClient({ subject }: { subject: Subject }) {
  const router = useRouter();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
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
    // Get student's grade and board from localStorage
    const studentGrade = localStorage.getItem('studentGrade');
    const studentBoardId = localStorage.getItem('studentBoardId');
    const studentBoard = localStorage.getItem('studentBoard');
    const studentGradeLevel = localStorage.getItem('studentGradeLevel');
    const name = localStorage.getItem('studentName') || localStorage.getItem('userName') || 'Student';
    const email = localStorage.getItem('studentEmail') || localStorage.getItem('userEmail') || '';
    
    setUserName(name);
    setUserEmail(email);
    
    // Get subject's grade and board
    const subjectGrade = subject.grade?.title;
    const subjectGradeLevel = subject.grade?.level;
    const subjectBoardId = subject.grade?.board?._id;
    const subjectBoard = subject.grade?.board?.name;
    
    console.log('=== ACCESS VALIDATION ===');
    console.log('Student:', { 
      grade: studentGrade, 
      gradeLevel: studentGradeLevel,
      boardId: studentBoardId,
      board: studentBoard 
    });
    console.log('Subject:', { 
      grade: subjectGrade, 
      gradeLevel: subjectGradeLevel,
      boardId: subjectBoardId,
      board: subjectBoard,
      name: subject.name 
    });
    
    // Check if student has grade and board set
    if (!studentGrade || !studentBoardId) {
      console.log('Access Denied: Student has no grade/board set');
      setAccessDenied(true);
      return;
    }
    
    // Check if subject grade and board exist
    if (!subjectGrade || !subjectBoardId) {
      console.log('Access Denied: Subject has no grade/board association');
      setAccessDenied(true);
      return;
    }
    
    // Validate that the subject belongs to this student's grade and board
    const gradeMatch = studentGrade === subjectGrade;
    const boardMatch = studentBoardId === subjectBoardId;
    
    console.log('Validation Results:', { gradeMatch, boardMatch });
    
    if (!gradeMatch || !boardMatch) {
      console.warn('Access Denied: Subject does not belong to student\'s grade/board');
      console.warn(`Student: ${studentGrade} / ${studentBoard} | Subject: ${subjectGrade} / ${subjectBoard}`);
      setAccessDenied(true);
      return;
    }
    
    console.log('Access Granted!');
    
    // Auto-select first chapter and first lesson
    if (subject.chapters && subject.chapters.length > 0 && !selectedChapter) {
      const firstChapter = subject.chapters[0];
      setSelectedChapter(firstChapter);
      setExpandedChapter(firstChapter._id);
      
      if (firstChapter.lessons && firstChapter.lessons.length > 0) {
        const firstLesson = firstChapter.lessons[0];
        setSelectedLesson(firstLesson);
        
        if (firstLesson.subTopics && firstLesson.subTopics.length > 0) {
          setExpandedLesson(firstLesson._id || '');
          setSelectedSubTopic(firstLesson.subTopics[0]);
        }
      }
    }
  }, [subject, selectedChapter]);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Subject not found</h2>
          <Link href="/student-dashboard" className="mt-4 inline-flex items-center text-olive-600">
            <Home size={16} className="mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const gradeTitle = subject.grade?.title || 'Grade';
  const boardName = subject.grade?.board?.name || 'Board';
  const subjectName = subject.name || 'Subject';
  const hasChapters = subject.chapters && subject.chapters.length > 0;

  // Extract video from content
  const extractVideoFromContent = (content: any[]) => {
    if (!content) return null;
    for (const item of content) {
      if (item._type === 'mediaObject' && item.mediaType === 'video' && item.video) {
        return {
          url: item.video,
          caption: item.caption
        };
      }
    }
    return null;
  };

  const hasVideo = (lesson: Lesson) => {
    if (lesson.content && extractVideoFromContent(lesson.content)) return true;
    if (selectedSubTopic?.content && extractVideoFromContent(selectedSubTopic.content)) return true;
    return false;
  };

  const getCurrentVideo = () => {
    if (selectedSubTopic?.content) {
      return extractVideoFromContent(selectedSubTopic.content);
    }
    if (selectedLesson?.content) {
      return extractVideoFromContent(selectedLesson.content);
    }
    return null;
  };

  const handleChapterClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setExpandedChapter(chapter._id);
    
    if (chapter.lessons && chapter.lessons.length > 0) {
      setSelectedLesson(chapter.lessons[0]);
      setExpandedLesson(chapter.lessons[0]._id || '');
      if (chapter.lessons[0].subTopics && chapter.lessons[0].subTopics.length > 0) {
        setSelectedSubTopic(chapter.lessons[0].subTopics[0]);
      } else {
        setSelectedSubTopic(null);
      }
    } else {
      setSelectedLesson(null);
      setSelectedSubTopic(null);
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setExpandedLesson(lesson._id || '');
    setSelectedSubTopic(lesson.subTopics && lesson.subTopics.length > 0 ? lesson.subTopics[0] : null);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSubTopicClick = (subTopic: SubTopic) => {
    setSelectedSubTopic(subTopic);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleBackToDashboard = () => {
    router.push('/student-dashboard');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Render content
  const renderContent = () => {
    const contentToRender = selectedSubTopic?.content || selectedLesson?.content;
    const title = selectedSubTopic?.title || selectedLesson?.title;
    const video = getCurrentVideo();

    if (!contentToRender && !title) return null;

    return (
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className={`${video ? 'lg:w-2/3' : 'w-full'} space-y-6`}>
          {/* Content Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {(selectedLesson?.duration || selectedSubTopic?.duration) && (
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  {selectedLesson?.duration || selectedSubTopic?.duration} min
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {gradeTitle} • {boardName}
              </span>
              <span>•</span>
              <span>{subjectName}</span>
              {selectedChapter && (
                <>
                  <span>•</span>
                  <span>{selectedChapter.title}</span>
                </>
              )}
              {selectedLesson && (
                <>
                  <span>•</span>
                  <span>{selectedLesson.title}</span>
                </>
              )}
              {selectedSubTopic && (
                <>
                  <span>•</span>
                  <span>{selectedSubTopic.title}</span>
                </>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {contentToRender && contentToRender.length > 0 ? (
              <div className="prose prose-lg max-w-none">
                {contentToRender.map((item: any, idx: number) => {
                  if (item._type === 'mediaObject' && item.mediaType === 'video') {
                    return null;
                  }
                  
                  if (item._type === 'block') {
                    return (
                      <div key={idx}>
                        {item.children?.map((child: any, childIdx: number) => {
                          if (child.text) {
                            if (item.style === 'h1') return <h1 key={childIdx} className="text-3xl font-bold mt-8 mb-4">{child.text}</h1>;
                            if (item.style === 'h2') return <h2 key={childIdx} className="text-2xl font-bold mt-6 mb-3">{child.text}</h2>;
                            if (item.style === 'h3') return <h3 key={childIdx} className="text-xl font-bold mt-5 mb-2">{child.text}</h3>;
                            return <p key={childIdx} className="text-gray-700 leading-relaxed mb-4">{child.text}</p>;
                          }
                          return null;
                        })}
                      </div>
                    );
                  }
                  if (item._type === 'image' && item.url) {
                    return (
                      <div key={idx} className="my-6 flex justify-center">
                        <img 
                          src={item.url} 
                          alt={item.alt || 'Image'} 
                          className="rounded-lg max-w-full h-auto shadow-md" 
                        />
                        {item.caption && (
                          <p className="text-sm text-gray-500 mt-2 text-center">{item.caption}</p>
                        )}
                      </div>
                    );
                  }
                  if (item._type === 'mathFormula' && item.latex) {
                    return (
                      <div key={idx} className="my-5 p-5 bg-gray-50 rounded-xl border border-gray-200 overflow-x-auto">
                        <p className="text-gray-800 font-mono text-lg">{item.latex}</p>
                      </div>
                    );
                  }
                  if (item._type === 'chemicalFormula' && item.formula) {
                    return (
                      <div key={idx} className="my-5 p-5 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-800 font-mono text-2xl text-center">{item.formula}</p>
                        {item.name && <p className="text-sm text-gray-500 mt-2 text-center">{item.name}</p>}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="text-gray-600">No content available yet.</p>
            )}

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Home size={16} />
                Dashboard
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700"
              >
                Mark Complete
                <CheckCircle size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Video Sidebar */}
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
                  {video.caption && (
                    <p className="text-sm text-gray-600 italic">{video.caption}</p>
                  )}
                  <a 
                    href={video.url}
                    download
                    className="inline-flex items-center gap-2 mt-3 text-sm text-olive-600 hover:text-olive-700"
                  >
                    <Download size={14} />
                    Download Video
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // If access is denied, show error message
  if (accessDenied) {
    const studentGrade = localStorage.getItem('studentGrade');
    const studentBoard = localStorage.getItem('studentBoard');
    const studentGradeLevel = localStorage.getItem('studentGradeLevel');
    const subjectGrade = subject.grade?.title;
    const subjectGradeLevel = subject.grade?.level;
    const subjectBoard = subject.grade?.board?.name;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/student-dashboard" className="text-xl font-bold text-olive-800">
                Puddle
              </Link>
              <UserProfile 
                userName={userName}
                userEmail={userEmail}
                userGrade={studentGrade || ''}
                userBoard={studentBoard || ''}
              />
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
              <p className="text-gray-600 mb-4">
                You don't have permission to view this content.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Your Grade:</strong> {studentGrade || 'Not set'} (Level: {studentGradeLevel || 'N/A'})<br />
                  <strong>Your Board:</strong> {studentBoard || 'Not set'}<br />
                  <strong>Content Grade:</strong> {subjectGrade || 'Unknown'} (Level: {subjectGradeLevel || 'N/A'})<br />
                  <strong>Content Board:</strong> {subjectBoard || 'Unknown'}
                </p>
                <p className="text-sm text-red-500 mt-3">
                  {studentGrade !== subjectGrade && `Grade mismatch: You are in ${studentGrade}, but this content is for ${subjectGrade}.`}
                  {studentBoard !== subjectBoard && ` Board mismatch: You are in ${studentBoard}, but this content is for ${subjectBoard}.`}
                </p>
              </div>
              <button
                onClick={handleBackToDashboard}
                className="px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
              </button>
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <Link href="/student-dashboard" className="text-xl font-bold text-olive-800 hover:text-olive-700 transition-colors">
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
                {gradeTitle} | {boardName}
              </span>
              <UserProfile 
                userName={userName}
                userEmail={userEmail}
                userGrade={gradeTitle}
                userBoard={boardName}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className={`
            lg:sticky lg:top-20 transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'lg:w-80' : 'lg:w-16'}
            flex-shrink-0
            ${sidebarOpen ? 'block' : 'hidden lg:block'}
            ${isMobile && sidebarOpen ? 'fixed inset-0 z-40 bg-white p-6 overflow-y-auto' : ''}
          `}>
            <div className={`bg-white rounded-xl shadow-sm ${!sidebarOpen && 'lg:overflow-hidden'}`}>
              {!sidebarOpen && (
                <div className="p-3 border-b border-gray-200 text-center">
                  <div className="w-10 h-10 bg-olive-100 rounded-lg flex items-center justify-center mx-auto">
                    <BookOpen size={20} className="text-olive-600" />
                  </div>
                </div>
              )}

              {sidebarOpen && (
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">{subjectName}</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {gradeTitle} • {boardName}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {subject.chapters?.length || 0} chapters • {subject.chapters?.reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0)} lessons
                  </p>
                </div>
              )}

              <div className={`py-2 max-h-[calc(100vh-200px)] overflow-y-auto ${!sidebarOpen && 'overflow-x-hidden'}`}>
                {subject.chapters?.map((chapter) => (
                  <div key={chapter._id} className="px-2">
                    <button
                      onClick={() => handleChapterClick(chapter)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedChapter?._id === chapter._id
                          ? 'bg-olive-50 text-olive-700'
                          : 'hover:bg-gray-50 text-gray-700'
                      } ${!sidebarOpen && 'justify-center'}`}
                      title={!sidebarOpen ? chapter.title : undefined}
                    >
                      {sidebarOpen ? (
                        <>
                          <div className="flex items-center gap-2">
                            <BookOpen size={18} className={selectedChapter?._id === chapter._id ? 'text-olive-600' : 'text-gray-400'} />
                            <span className="font-medium text-sm line-clamp-1">{chapter.title}</span>
                          </div>
                          <ChevronDown size={16} className={`transition-transform ${expandedChapter === chapter._id ? 'rotate-180' : ''}`} />
                        </>
                      ) : (
                        <div className="relative group">
                          <BookOpen size={20} className={selectedChapter?._id === chapter._id ? 'text-olive-600' : 'text-gray-400'} />
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block z-50">
                            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {chapter.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>

                    {sidebarOpen && expandedChapter === chapter._id && (
                      <div className="ml-4 mt-1 space-y-1">
                        {chapter.lessons?.map((lesson) => (
                          <div key={lesson._id}>
                            <button
                              onClick={() => handleLessonClick(lesson)}
                              className={`w-full text-left p-2 rounded-lg transition-all ${
                                selectedLesson?._id === lesson._id
                                  ? 'bg-olive-100 text-olive-700 border-l-2 border-olive-500'
                                  : 'hover:bg-gray-50 text-gray-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <PlayCircle size={14} className="flex-shrink-0" />
                                  <span className="text-sm line-clamp-1">{lesson.title}</span>
                                </div>
                                {hasVideo(lesson) && (
                                  <Video size={12} className="text-purple-500 flex-shrink-0" />
                                )}
                              </div>
                              {lesson.duration && (
                                <div className="text-xs text-gray-400 ml-6 mt-0.5">
                                  {lesson.duration} min
                                </div>
                              )}
                            </button>

                            {lesson.subTopics && lesson.subTopics.length > 0 && expandedLesson === lesson._id && (
                              <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                                {lesson.subTopics.map((subTopic, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleSubTopicClick(subTopic)}
                                    className={`w-full text-left p-1.5 rounded-lg transition-all ${
                                      selectedSubTopic?.title === subTopic.title
                                        ? 'text-olive-600 font-medium'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs">•</span>
                                      <span className="text-xs line-clamp-1">{subTopic.title}</span>
                                    </div>
                                    {subTopic.duration && (
                                      <div className="text-xs text-gray-400 ml-5">
                                        {subTopic.duration} min
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {sidebarOpen && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Chapters</span>
                    <span className="font-medium text-gray-900">{subject.chapters?.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Total Lessons</span>
                    <span className="font-medium text-gray-900">
                      {subject.chapters?.reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <main className="flex-1 min-w-0">
            {(selectedLesson || selectedSubTopic) ? (
              renderContent()
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{subjectName}</h2>
                <p className="text-gray-600 mb-6">{subject.description || 'Select a chapter from the menu to start learning.'}</p>
                {hasChapters && (
                  <button
                    onClick={() => subject.chapters[0] && handleChapterClick(subject.chapters[0])}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700"
                  >
                    <PlayCircle size={20} />
                    Start First Chapter
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}