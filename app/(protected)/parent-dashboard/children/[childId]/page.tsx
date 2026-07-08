// app/(protected)/parent-dashboard/children/[childId]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  AlertCircle, 
  CheckCircle,
  RefreshCw,
  GraduationCap,
  School,
  User,
  Mail,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface Child {
  id: string;
  name: string;
  email: string;
  grade: string;
  gradeLevel: number;
  board: string;
  boardId?: string;
  school: string;
  gender?: string;
  dateOfBirth?: string;
  subscriptionStatus?: string;
  subscriptionEndDate?: string;
}

interface Board {
  _id: string;
  name: string;
  code: string;
  description?: string;
}

interface PageProps {
  params: Promise<{
    childId: string;
  }>;
}

export default function EditChildPage({ params }: PageProps) {
  const router = useRouter();
  const [child, setChild] = useState<Child | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showGradeChangeWarning, setShowGradeChangeWarning] = useState(false);
  const [originalGrade, setOriginalGrade] = useState<number>(0);
  const [childId, setChildId] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        setChildId(resolvedParams.childId);
        fetchChild(resolvedParams.childId);
        fetchBoards();
      } catch (err) {
        console.error('Error resolving params:', err);
        setError('Failed to load child data');
        setLoading(false);
      }
    };
    
    unwrapParams();
  }, [params]);

  const fetchBoards = async () => {
    try {
      setLoadingBoards(true);
      const response = await fetch('/api/boards');
      const data = await response.json();
      if (response.ok && data.boards) {
        setBoards(data.boards);
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoadingBoards(false);
    }
  };

  const fetchChild = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/parent/children/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setChild(data.child);
        setOriginalGrade(data.child.gradeLevel);
      } else {
        setError('Failed to fetch child details');
      }
    } catch (error) {
      console.error('Error fetching child:', error);
      setError('Error loading child data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!child || !childId) return;
    
    const gradeChanged = child.gradeLevel !== originalGrade;
    
    if (gradeChanged && !showGradeChangeWarning) {
      setShowGradeChangeWarning(true);
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`/api/parent/children/${childId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: child.name,
          grade: child.grade,
          gradeLevel: child.gradeLevel,
          board: child.board,
          boardId: child.boardId,
          school: child.school,
          gender: child.gender,
          dateOfBirth: child.dateOfBirth
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Child updated successfully!');
        
        if (gradeChanged) {
          setSuccess('Child updated successfully! Previous subscriptions have been invalidated. Please enroll in the new grade.');
        }
        
        setTimeout(() => {
          router.push('/parent-dashboard');
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to update child');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update child');
    } finally {
      setSaving(false);
    }
  };

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Child Not Found</h2>
          <Link href="/parent-dashboard" className="text-blue-600 hover:text-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link 
            href="/parent-dashboard" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Child Profile</h1>
            <p className="text-gray-600 mb-6">Update your child's information</p>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-700">{success}</p>
                  {success.includes('Previous subscriptions have been invalidated') && (
                    <p className="text-sm text-green-600 mt-1">
                      Please go to the Payments tab to enroll in the new grade subscription.
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            {showGradeChangeWarning && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-1">Grade Change Warning</h3>
                    <p className="text-sm text-yellow-700 mb-2">
                      Changing the grade from {originalGrade} to {child.gradeLevel} will:
                    </p>
                    <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                      <li>Invalidate all existing subscriptions for the current grade</li>
                      <li>Remove access to current grade course material</li>
                      <li>Require a new subscription for the selected grade</li>
                    </ul>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
                      >
                        Yes, Change Grade
                      </button>
                      <button
                        onClick={() => {
                          setShowGradeChangeWarning(false);
                          setChild({...child, gradeLevel: originalGrade, grade: `Grade ${originalGrade}`});
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={child.name}
                    onChange={(e) => setChild({...child, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={child.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={child.gradeLevel}
                      onChange={(e) => {
                        const newLevel = parseInt(e.target.value);
                        setChild({
                          ...child, 
                          gradeLevel: newLevel,
                          grade: `Grade ${newLevel}`
                        });
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                  {child.gradeLevel !== originalGrade && (
                    <p className="text-xs text-yellow-600 mt-1">
                      ⚠️ Changing grade will invalidate existing subscriptions
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={child.boardId || ''}
                      onChange={(e) => {
                        const selectedBoardId = e.target.value;
                        const selectedBoard = boards.find(b => b._id === selectedBoardId);
                        setChild({
                          ...child,
                          boardId: selectedBoardId,
                          board: selectedBoard?.name || ''
                        });
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={loadingBoards}
                    >
                      <option value="">Select Board</option>
                      {boards.map((board) => (
                        <option key={board._id} value={board._id}>
                          {board.name} {board.code ? `(${board.code})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  {loadingBoards && (
                    <p className="text-xs text-gray-400 mt-1">Loading boards...</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                <input
                  type="text"
                  value={child.school}
                  onChange={(e) => setChild({...child, school: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={child.gender || ''}
                    onChange={(e) => setChild({...child, gender: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={formatDateForInput(child.dateOfBirth)}
                      onChange={(e) => setChild({...child, dateOfBirth: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {child.subscriptionStatus === 'active' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Current Subscription:</strong> Active until {new Date(child.subscriptionEndDate || '').toLocaleDateString()}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Note: Changing grade will invalidate this subscription
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
                <Link
                  href="/parent-dashboard"
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}