"use client"

import Link from 'next/link';
import { 
  ArrowLeft,
  User,
  Mail,
  Calendar,
  School,
  BookOpen,
  Edit,
  Save,
  X,
  Shield,
  Clock,
  Award,
  TrendingUp,
  Download,
  Printer,
  Share2,
  Bell
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface ChildProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  grade: string;
  dateOfBirth: string;
  school: string;
  createdAt: string;
}

interface ProgressData {
  overallScore: number;
  hoursStudied: number;
  completedLessons: number;
  lastActivity: string;
  courseName: string;
  activeCourses: number;
}

export default function ChildProfilePage() {
  const router = useRouter();
  const params = useParams();
  const childId = params.childId as string;
  
  const [childData, setChildData] = useState<ChildProfile | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    grade: '',
    school: '',
    dateOfBirth: ''
  });

  const fetchChildData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch child profile
      const response = await fetch(`/api/parent/children/${childId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch child data');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setChildData(data.child);
        setProgressData(data.progress);
        
        // Set edit form values
        setEditForm({
          grade: data.child.grade || '',
          school: data.child.school || '',
          dateOfBirth: data.child.dateOfBirth || ''
        });
      } else {
        throw new Error(data.error || 'Failed to load child data');
      }
    } catch (error: any) {
      console.error('Error fetching child data:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (childId) {
      fetchChildData();
    }
  }, [childId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (childData) {
      setEditForm({
        grade: childData.grade || '',
        school: childData.school || '',
        dateOfBirth: childData.dateOfBirth || ''
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/parent/children/${childId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        if (childData) {
          setChildData({
            ...childData,
            grade: editForm.grade,
            school: editForm.school,
            dateOfBirth: editForm.dateOfBirth
          });
        }
        
        setIsEditing(false);
        alert('Profile updated successfully!');
        
        // Refresh data
        fetchChildData();
      } else {
        throw new Error(data.error || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Error updating child:', error);
      alert(error.message || 'Failed to update profile');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 'Unknown';
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} years`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading child profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !childData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-red-500 text-6xl mb-4">!</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'Child profile could not be loaded'}</p>
            <Link
              href="/parent-dashboard"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/parent-dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Printer className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {childData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{childData.name}</h1>
                <p className="text-gray-600">
                  {childData.email} • Member since {formatDate(childData.createdAt)}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information Card */}
              <div className="bg-white rounded-xl shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Basic Information
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4 inline-block mr-1" />
                        Email Address
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900">{childData.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <BookOpen className="h-4 w-4 inline-block mr-1" />
                        Username
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900">{childData.username}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade Level
                      </label>
                      {isEditing ? (
                        <select
                          value={editForm.grade}
                          onChange={(e) => setEditForm({...editForm, grade: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Grade</option>
                          <option value="Kindergarten">Kindergarten</option>
                          <option value="Grade 1">Grade 1</option>
                          <option value="Grade 2">Grade 2</option>
                          <option value="Grade 3">Grade 3</option>
                          <option value="Grade 4">Grade 4</option>
                          <option value="Grade 5">Grade 5</option>
                          <option value="Grade 6">Grade 6</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                          <option value="Grade 9">Grade 9</option>
                          <option value="Grade 10">Grade 10</option>
                          <option value="Grade 11">Grade 11</option>
                          <option value="Grade 12">Grade 12</option>
                        </select>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-900">{childData.grade || 'Not specified'}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 inline-block mr-1" />
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editForm.dateOfBirth}
                          onChange={(e) => setEditForm({...editForm, dateOfBirth: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-900">
                            {formatDate(childData.dateOfBirth)} ({calculateAge(childData.dateOfBirth)})
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <School className="h-4 w-4 inline-block mr-1" />
                        School Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.school}
                          onChange={(e) => setEditForm({...editForm, school: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter school name"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-900">{childData.school || 'Not specified'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              {progressData && (
                <div className="bg-white rounded-xl shadow">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Learning Progress
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-blue-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Award className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Overall Score</p>
                            <p className="text-2xl font-bold text-gray-900">{progressData.overallScore}%</p>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${progressData.overallScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Clock className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Hours Studied</p>
                            <p className="text-2xl font-bold text-gray-900">{progressData.hoursStudied}h</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Total learning time</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <BookOpen className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Lessons Completed</p>
                            <p className="text-2xl font-bold text-gray-900">{progressData.completedLessons}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Total lessons finished</p>
                      </div>
                      
                      <div className="bg-orange-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Active Courses</p>
                            <p className="text-2xl font-bold text-gray-900">{progressData.activeCourses}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Currently enrolled</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Last Activity</p>
                          <p className="text-gray-900">
                            {progressData.lastActivity 
                              ? formatDate(progressData.lastActivity)
                              : 'No recent activity'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Course</p>
                          <p className="text-gray-900 font-medium">{progressData.courseName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Quick Actions & Info */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Set Study Reminders</p>
                      <p className="text-sm text-gray-600">Schedule study sessions</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Download className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Download Reports</p>
                      <p className="text-sm text-gray-600">Progress and performance</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Parental Controls</p>
                      <p className="text-sm text-gray-600">Manage access and limits</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow text-white">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Profile Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="opacity-90">Account Created</span>
                      <span className="font-medium">{formatDate(childData.createdAt)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="opacity-90">Age</span>
                      <span className="font-medium">{calculateAge(childData.dateOfBirth)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="opacity-90">Grade Level</span>
                      <span className="font-medium">{childData.grade || 'Not set'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="opacity-90">School</span>
                      <span className="font-medium truncate">{childData.school || 'Not set'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm opacity-90">Student ID: {childData.userId.substring(0, 8)}...</p>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-xl shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Parent Notes</h2>
                </div>
                
                <div className="p-6">
                  <textarea
                    placeholder="Add notes about your child's progress, strengths, or areas for improvement..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    defaultValue=""
                  />
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex justify-end gap-3">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Export Profile
            </button>
            <Link
              href="/parent-dashboard"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}