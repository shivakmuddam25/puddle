"use client"

import Link from 'next/link';
import { 
  Home,
  BookOpen,
  FileText,
  TrendingUp,
  Target,
  Clock,
  Award,
  LogOut,
  ChevronLeft,
  PlayCircle,
  Download,
  Calendar
} from 'lucide-react';

export default function StudentDashboard() {
  const mockCourses = [
    { id: 1, name: 'Mathematics - Grade 10', progress: 75, nextLesson: 'Algebra Basics' },
    { id: 2, name: 'Physics - JEE Preparation', progress: 60, nextLesson: 'Optics' },
    { id: 3, name: 'Chemistry', progress: 45, nextLesson: 'Organic Chemistry' },
  ];

  const mockTests = [
    { id: 1, name: 'Math Mock Test', score: 85, date: '2024-02-01' },
    { id: 2, name: 'Physics Quiz', score: 72, date: '2024-01-28' },
    { id: 3, name: 'Chemistry Assessment', score: 90, date: '2024-01-25' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold text-olive-800 font-serif">Puddle</span>
              </Link>
              <div className="hidden md:block text-sm text-olive-600 italic">
                Your learning journey
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-olive-100 rounded-full flex items-center justify-center">
                  <span className="text-olive-700 font-medium">S</span>
                </div>
                <span className="hidden md:inline text-sm font-medium">Student Account</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Home */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-olive-700 hover:text-olive-900 font-medium group"
        >
          <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to your dashboard!</h1>
            <p className="text-gray-600 mt-2">Continue your learning journey from where you left off.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-olive-50 rounded-lg">
                  <BookOpen className="text-olive-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Target className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Avg. Score</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Clock className="text-purple-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Study Time</p>
                  <p className="text-2xl font-bold">24h</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-2xl font-bold">+12%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-xl shadow mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            </div>
            
            <div className="p-6">
              <div className="grid gap-6">
                {mockCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:border-olive-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{course.name}</h3>
                        <p className="text-gray-600">Next: {course.nextLesson}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-olive-600">{course.progress}%</div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div 
                            className="h-full bg-gradient-to-r from-olive-500 to-emerald-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700">
                        <PlayCircle size={18} />
                        Continue Learning
                      </button>
                      <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-olive-600 text-olive-600 rounded-lg hover:bg-olive-50">
                        <Calendar size={18} />
                        Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Tests */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Recent Test Results</h2>
                <button className="inline-flex items-center gap-2 text-olive-600 hover:text-olive-800">
                  <Download size={16} />
                  Download Report
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid gap-4">
                {mockTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        test.score >= 90 ? 'bg-green-100 text-green-600' :
                        test.score >= 75 ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{test.name}</h4>
                        <p className="text-sm text-gray-600">Taken on {test.date}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{test.score}%</span>
                        {test.score >= 90 && <Award className="text-yellow-500" size={20} />}
                      </div>
                      <div className="text-sm text-gray-600">
                        {test.score >= 90 ? 'Excellent!' : test.score >= 75 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}