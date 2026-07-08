// app/(protected)/student-dashboard/page.tsx
"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  BookOpen,
  FileText,
  Target,
  Clock,
  Award,
  LogOut,
  ChevronLeft,
  PlayCircle,
  ChevronRight,
  School,
  GraduationCap,
  Layers,
  Sparkles,
  AlertCircle,
  Settings,
  HelpCircle,
  AlertTriangle,
  CreditCard,
  ExternalLink,
  Gift
} from 'lucide-react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import UserProfile from '@/components/UserProfile';

interface Subject {
  _id: string;
  name: string;
  code: string;
  description: string;
  icon?: any;
  image?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  color?: string;
  chaptersCount: number;
  totalLessons: number;
  slug: { current: string };
  grade: { _ref: string };
  board: { _ref: string };
}

interface ActiveGrade {
  gradeLevel: number;
  subscriptionId: string;
  endDate: string;
  startDate: string;
  billingCycle: string;
}

interface UserData {
  name: string;
  email: string;
  selectedBoard?: string;
  selectedBoardId?: string;
  selectedGrade?: string;
  selectedGradeLevel?: number;
  childId?: string;
}

interface DebugInfo {
  gradeExists: boolean;
  boardExists: boolean;
  gradeLinkedToBoard: boolean;
  availableGrades: string[];
  availableBoards: string[];
  studentGrade: string;
  studentBoard: string;
  studentBoardId: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [selectedBoardName, setSelectedBoardName] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<number>(0);
  const [showDebug, setShowDebug] = useState(false);
  
  // Access control states
  const [hasAccess, setHasAccess] = useState(false);
  const [accessDeniedReason, setAccessDeniedReason] = useState<string | null>(null);
  const [showEnrollmentPrompt, setShowEnrollmentPrompt] = useState(false);
  const [activeGrades, setActiveGrades] = useState<ActiveGrade[]>([]);
  const [availableGrades, setAvailableGrades] = useState<number[]>([]);
  const [selectedAccessGrade, setSelectedAccessGrade] = useState<number | null>(null);
  const [showGradeSelector, setShowGradeSelector] = useState(false);

  useEffect(() => {
    loadStudentData();
  }, []);


// In student-dashboard/page.tsx, update the loadStudentData function

const loadStudentData = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setError('Please login again');
      setLoading(false);
      return;
    }
    
    console.log('Loading student data...');
    
    // First, try to get the student profile from API
    try {
      const profileResponse = await fetch('/api/student/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Profile response status:', profileResponse.status);
      
      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        console.log('Student profile from API:', profile);
        
        // Update localStorage with correct student data
        localStorage.setItem('studentId', profile.id);
        localStorage.setItem('studentGrade', profile.grade);
        localStorage.setItem('studentGradeLevel', profile.gradeLevel.toString());
        localStorage.setItem('studentBoard', profile.board);
        localStorage.setItem('studentBoardId', profile.boardId);
        localStorage.setItem('studentName', profile.name);
        localStorage.setItem('studentEmail', profile.email);
        
        setSelectedGrade(profile.grade);
        setSelectedBoard(profile.boardId);
        setSelectedBoardName(profile.board);
        setSelectedGradeLevel(profile.gradeLevel);
        
        // IMPORTANT: Set userData for the UserProfile component
        setUserData({
          name: profile.name,
          email: profile.email,
          selectedBoard: profile.board,
          selectedBoardId: profile.boardId,
          selectedGrade: profile.grade,
          selectedGradeLevel: profile.gradeLevel,
          childId: profile.id
        });
        
        // Check access and load subjects
        await checkAccessAndLoadSubjects(profile.id, profile.gradeLevel, profile.boardId);
      } else if (profileResponse.status === 400) {
        // Parent access mode
        const studentGrade = localStorage.getItem('studentGrade');
        const studentGradeLevel = localStorage.getItem('studentGradeLevel');
        const studentBoard = localStorage.getItem('studentBoard');
        const studentBoardId = localStorage.getItem('studentBoardId');
        const studentId = localStorage.getItem('studentId');
        const studentName = localStorage.getItem('studentName');
        const studentEmail = localStorage.getItem('studentEmail');
        const isParentAccess = localStorage.getItem('isParentAccess') === 'true';
        
        if (isParentAccess && studentId && studentGrade && studentBoard) {
          console.log('Parent access mode - using stored child data');
          setSelectedGrade(studentGrade);
          setSelectedBoard(studentBoardId);
          setSelectedBoardName(studentBoard);
          setSelectedGradeLevel(studentGradeLevel ? parseInt(studentGradeLevel) : 0);
          
          // IMPORTANT: Set userData from localStorage for parent access
          setUserData({
            name: studentName || 'Student',
            email: studentEmail || '',
            selectedBoard: studentBoard,
            selectedBoardId: studentBoardId,
            selectedGrade: studentGrade,
            selectedGradeLevel: studentGradeLevel ? parseInt(studentGradeLevel) : 0,
            childId: studentId
          });
          
          await checkAccessAndLoadSubjects(studentId, parseInt(studentGradeLevel || '0'), studentBoardId);
        } else {
          setError('Unable to load student profile. Please contact your parent.');
          setLoading(false);
        }
      } else {
        const errorData = await profileResponse.json();
        console.error('Profile API error:', errorData);
        setError(errorData.error || 'Failed to load profile');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again.');
      setLoading(false);
    }
  } catch (err) {
    console.error('Error loading student data:', err);
    setError('Failed to load student data');
    setLoading(false);
  }
};
 
  const checkAccessAndLoadSubjects = async (studentId: string, gradeLevel: number, boardId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login again');
        setLoading(false);
        return;
      }
      
      // Check if student has access to this grade
      const response = await fetch(`/api/student/subscription-status?studentId=${studentId}&gradeLevel=${gradeLevel}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      console.log('Access check result:', data);
      
      if (data.hasAccess) {
        // Has access - load subjects
        setHasAccess(true);
        setAccessDeniedReason(null);
        setShowEnrollmentPrompt(false);
        setActiveGrades(data.activeGrades || []);
        
        // Check if student has multiple active grades
        const multipleGrades = data.activeGrades?.filter((g: any) => g.billingCycle !== 'free_trial') || [];
        if (multipleGrades.length > 1) {
          setAvailableGrades(multipleGrades.map((g: any) => g.gradeLevel));
          setShowGradeSelector(true);
          setSelectedAccessGrade(gradeLevel);
        }
        
        // Load subjects from Sanity
        validateAndFetchSubjects(`Grade ${gradeLevel}`, boardId);
      } else {
        // No access - show enrollment prompt
        setHasAccess(false);
        setShowEnrollmentPrompt(true);
        setActiveGrades(data.activeGrades || []);
        
        // Check if this is a grade change scenario
        if (data.reason === 'grade_changed') {
          setAccessDeniedReason('Your grade has been changed. Please ask your parent to enroll in the new grade.');
        } else if (data.freeTrialUsed && !data.hasAccess) {
          setAccessDeniedReason('Your free trial has expired. Please ask your parent to subscribe to continue learning.');
        } else {
          setAccessDeniedReason('No active subscription for this grade. Please ask your parent to enroll.');
        }
        
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Error checking access:', err);
      setError('Failed to verify access. Please try again.');
      setLoading(false);
    }
  };

  const handleGradeSwitch = async (gradeLevel: number) => {
    const studentId = localStorage.getItem('studentId');
    const boardId = localStorage.getItem('studentBoardId');
    
    if (studentId && boardId) {
      setSelectedGradeLevel(gradeLevel);
      setSelectedGrade(`Grade ${gradeLevel}`);
      localStorage.setItem('studentGradeLevel', gradeLevel.toString());
      localStorage.setItem('studentGrade', `Grade ${gradeLevel}`);
      
      await checkAccessAndLoadSubjects(studentId, gradeLevel, boardId);
    }
  };

 
// app/(protected)/student-dashboard/page.tsx
// Replace the validateAndFetchSubjects function with this fixed version

const validateAndFetchSubjects = async (gradeTitle: string, boardId: string) => {
  try {
    console.log('validateAndFetchSubjects called with:', { gradeTitle, boardId });
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    
    // Step 1: Check if board exists in Sanity
    const boardQuery = `*[_type == "board" && _id == $boardId && isActive == true][0] { _id, name, code }`;
    const boardData = await client.fetch(boardQuery, { boardId });
    
    console.log('Board data from Sanity:', boardData);
    
    if (!boardData) {
      setError(`Board not found. The selected board may have been removed or deactivated.`);
      setDebugInfo({
        gradeExists: false,
        boardExists: false,
        gradeLinkedToBoard: false,
        availableGrades: [],
        availableBoards: await getAvailableBoards(),
        studentGrade: gradeTitle,
        studentBoard: boardId,
        studentBoardId: boardId
      });
      setLoading(false);
      return;
    }
    
    // Step 2: Check if grade exists for this board
    const gradeQuery = `
      *[_type == "grade" && title == $gradeTitle && board._ref == $boardId && isActive == true][0] {
        _id,
        title,
        level,
        board-> { name }
      }
    `;
    const gradeData = await client.fetch(gradeQuery, { gradeTitle, boardId });
    
    console.log('Grade data from Sanity:', gradeData);
    
    if (!gradeData) {
      // Get all grades for this board to show available options
      const availableGradesQuery = `
        *[_type == "grade" && board._ref == $boardId && isActive == true] | order(level asc) {
          title,
          level
        }
      `;
      const availableGradesData = await client.fetch(availableGradesQuery, { boardId });
      
      let errorMessage = `Grade "${gradeTitle}" is not available for ${boardData.name}.`;
      
      if (availableGradesData.length > 0) {
        const gradeList = availableGradesData.map(g => g.title).join(', ');
        errorMessage += ` Available grades for ${boardData.name}: ${gradeList}.`;
      } else {
        errorMessage += ` No grades have been set up for ${boardData.name} yet.`;
      }
      
      setError(errorMessage);
      setDebugInfo({
        gradeExists: false,
        boardExists: true,
        gradeLinkedToBoard: false,
        availableGrades: availableGradesData.map(g => g.title),
        availableBoards: [],
        studentGrade: gradeTitle,
        studentBoard: boardData.name,
        studentBoardId: boardId
      });
      setLoading(false);
      return;
    }
    
    // Step 3: Fetch subjects for this grade
    const subjectsQuery = `
      *[_type == "subject" && grade._ref == $gradeId && isActive == true] | order(order asc) {
        _id,
        name,
        code,
        description,
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
        color,
        "chaptersCount": count(*[_type == "chapter" && subject._ref == ^._id && isActive == true]),
        "totalLessons": count(*[_type == "chapter" && subject._ref == ^._id && isActive == true].lessons[]),
        slug
      }
    `;
    const subjectsData = await client.fetch(subjectsQuery, { gradeId: gradeData._id });
    
    console.log('Subjects fetched:', subjectsData.length);
    setSubjects(subjectsData || []);
    
    if (subjectsData.length === 0) {
      setError(`No subjects available for ${gradeData.title} in ${boardData.name} yet. Check back soon!`);
    } else {
      // Success - subjects loaded
      setError(null);
    }
    
    setLoading(false);
    
  } catch (err: any) {
    console.error('Error fetching subjects:', err);
    setError('Failed to load subjects. Please try again later.');
    setLoading(false);
  }
};

 
  const getAvailableBoards = async () => {
    const query = `*[_type == "board" && isActive == true] { _id, name, code }`;
    const boards = await client.fetch(query);
    return boards.map((b: any) => `${b.name} (${b.code || b._id.substring(0, 8)})`);
  };
  
  const checkGradeExistsAnywhere = async (gradeTitle: string) => {
    const query = `*[_type == "grade" && title == $gradeTitle && isActive == true] { _id, "board": board->name }`;
    const grades = await client.fetch(query, { gradeTitle });
    return grades.length > 0;
  };

  const handleSubjectSelect = (subject: Subject) => {
    router.push(`/subject/${subject.slug.current}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('studentGrade');
    localStorage.removeItem('studentGradeLevel');
    localStorage.removeItem('studentBoard');
    localStorage.removeItem('studentBoardId');
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isParentAccess');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-olive-50/30 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your learning materials...</p>
        </div>
      </div>
    );
  }

  // Enrollment prompt - no access
  if (showEnrollmentPrompt && !hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-olive-800 font-serif">Puddle</Link>
              <UserProfile 
                userName={userData?.name || 'Student'}
                userEmail={userData?.email || ''}
                userGrade={selectedGrade}
                userBoard={selectedBoardName}
              />
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h1>
              <p className="text-gray-600 mb-6">{accessDeniedReason || 'No active subscription for this grade.'}</p>
              
              {activeGrades.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>You have access to:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {activeGrades.map(grade => (
                      <span key={grade.gradeLevel} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        Grade {grade.gradeLevel}
                      </span>
                    ))}
                  </div>
                  {selectedGradeLevel && !activeGrades.some(g => g.gradeLevel === selectedGradeLevel) && (
                    <p className="text-xs text-blue-600 mt-3">
                      Your current grade ({selectedGrade}) is not in your active subscriptions.
                    </p>
                  )}
                </div>
              )}
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.location.href = '/parent-dashboard'}
                  className="px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700 flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  Contact Parent
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 border-2 border-olive-600 text-olive-600 rounded-lg hover:bg-olive-50"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state - no grade/board set
  if (error && !subjects.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-olive-800 font-serif">Puddle</Link>
              <UserProfile 
                userName={userData?.name || 'Student'}
                userEmail={userData?.email || ''}
                userGrade={selectedGrade}
                userBoard={selectedBoardName}
              />
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup Required</h1>
              <p className="text-gray-600 mb-6 whitespace-pre-line">{error}</p>
              
              {/* Debug Information */}
              {debugInfo && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                  <button 
                    onClick={() => setShowDebug(!showDebug)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-3"
                  >
                    <HelpCircle size={16} />
                    <span className="font-medium">Technical Details</span>
                  </button>
                  
                  {showDebug && (
                    <div className="space-y-2 text-sm">
                      <p><strong>Student Configuration:</strong></p>
                      <ul className="list-disc list-inside ml-2 text-gray-600 space-y-1">
                        <li>Grade: {debugInfo.studentGrade || 'Not set'}</li>
                        <li>Board: {debugInfo.studentBoard || 'Not set'}</li>
                      </ul>
                      
                      {debugInfo.availableGrades.length > 0 && (
                        <>
                          <p className="mt-2"><strong>Available Grades for this Board:</strong></p>
                          <ul className="list-disc list-inside ml-2 text-gray-600">
                            {debugInfo.availableGrades.map((grade, i) => (
                              <li key={i}>{grade}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      <p className="mt-3 text-xs text-gray-500">
                        Please contact your parent or administrator to update your grade and board settings.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={() => window.location.href = '/parent-dashboard'}
                  className="px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700"
                >
                  Contact Parent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard with subjects
  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link 
                href="/student-dashboard" 
                className="text-2xl font-bold text-olive-800 font-serif hover:text-olive-700 transition-colors"
              >
                Puddle
              </Link>
              {selectedGrade && selectedBoardName && (
                <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-1 bg-olive-100 rounded-full">
                  <GraduationCap size={14} className="text-olive-600" />
                  <span className="text-sm text-olive-700">{selectedGrade}</span>
                  <span className="text-olive-400">|</span>
                  <School size={14} className="text-olive-600" />
                  <span className="text-sm text-olive-700">{selectedBoardName}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <UserProfile 
                userName={userData?.name || 'Student'}
                userEmail={userData?.email || ''}
                userGrade={selectedGrade}
                userBoard={selectedBoardName}
              />
              <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Grade Selector for Multi-Grade Access */}
          {showGradeSelector && availableGrades.length > 1 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">Switch Grade</h3>
                  <p className="text-xs text-blue-600 mb-3">
                    You have access to multiple grades. Select which grade you want to study:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availableGrades.map(grade => (
                      <button
                        key={grade}
                        onClick={() => handleGradeSwitch(grade)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedGradeLevel === grade
                            ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        Grade {grade}
                        {activeGrades.some(g => g.gradeLevel === grade && g.billingCycle === 'free_trial') && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                            Trial
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Subjects</h1>
            <p className="text-gray-600 mt-2">
              Select a subject to start learning for {selectedGrade}
            </p>
            {activeGrades.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <p className="text-xs text-green-600">
                  Active subscription for {activeGrades.filter(g => g.billingCycle !== 'free_trial').length} grade(s)
                </p>
              </div>
            )}
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                onClick={() => handleSubjectSelect(subject)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 group"
              >
                {/* Subject Image */}
                {subject.image?.asset?.url ? (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={subject.image.asset.url}
                      alt={subject.image.alt || subject.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ) : (
                  <div 
                    className="relative h-44 w-full bg-gradient-to-r"
                    style={{ 
                      background: subject.color 
                        ? `linear-gradient(135deg, ${subject.color}80, ${subject.color}20)`
                        : 'linear-gradient(135deg, #10b98180, #10b98120)'
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {subject.icon?.asset?.url ? (
                        <Image
                          src={subject.icon.asset.url}
                          alt={subject.name}
                          width={48}
                          height={48}
                          className="object-contain opacity-40"
                        />
                      ) : (
                        <BookOpen size={48} className="text-white/30" />
                      )}
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="p-5">
                  <div className="mb-3">
                    <span 
                      className="inline-block px-2 py-1 text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: `${subject.color || '#10b981'}20`,
                        color: subject.color || '#10b981'
                      }}
                    >
                      {subject.code || subject.name.substring(0, 3).toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{subject.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {subject.description || `Explore ${subject.name} for your grade`}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Layers size={14} />
                      <span>{subject.chaptersCount || 0} chapters</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FileText size={14} />
                      <span>{subject.totalLessons || 0} lessons</span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium"
                    style={{ backgroundColor: subject.color || '#10b981' }}
                  >
                    View Chapters
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {subjects.length === 0 && !error && (
              <div className="col-span-full bg-white rounded-xl shadow-lg p-12 text-center">
                <Sparkles className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Subjects Available</h3>
                <p className="text-gray-600">Subjects for your grade will be added soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}