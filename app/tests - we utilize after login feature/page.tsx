// app/dashboard/page.tsx
"use client"

import Link from 'next/link';
import { 
  Home,
  GraduationCap,
  FileText,
  DollarSign,
  User,
  LogIn,
  Menu,
  X,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  BarChart3,
  Award,
  Calendar,
  BookOpen as BookOpenIcon,
  Brain,
  Trophy,
  CheckCircle,
  ArrowRight,
  Settings,
  Bell,
  Download,
  Share2,
  Eye,
  Bookmark,
  LogOut,
  ChevronRight,
  PlayCircle,
  Users as UsersIcon
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { label: 'Tests Taken', value: '24', change: '+12%', color: 'blue' },
    { label: 'Avg. Score', value: '78%', change: '+5%', color: 'emerald' },
    { label: 'Study Hours', value: '156', change: '+18%', color: 'purple' },
    { label: 'Accuracy', value: '82%', change: '+3%', color: 'amber' }
  ];

  const recentTests = [
    {
      id: 1,
      name: 'JEE Main Full Test 3',
      date: 'Today, 10:30 AM',
      score: '185/300',
      percentile: '92.5',
      timeSpent: '2h 45m',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Physics Chapter Test',
      date: 'Yesterday, 4:15 PM',
      score: '42/50',
      percentile: '88.3',
      timeSpent: '45m',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Chemistry Speed Test',
      date: 'Jan 14, 2024',
      score: '35/40',
      percentile: '95.2',
      timeSpent: '30m',
      status: 'completed'
    },
    {
      id: 4,
      name: 'Maths Mock Test',
      date: 'In Progress',
      score: '-',
      percentile: '-',
      timeSpent: '15m/3h',
      status: 'in-progress'
    }
  ];

  const studyPlan = [
    {
      day: 'Today',
      tasks: [
        { subject: 'Physics', topic: 'Optics', duration: '2 hours', completed: true },
        { subject: 'Chemistry', topic: 'Organic Reactions', duration: '1.5 hours', completed: false },
        { subject: 'Mathematics', topic: 'Calculus', duration: '2 hours', completed: false }
      ]
    },
    {
      day: 'Tomorrow',
      tasks: [
        { subject: 'Physics', topic: 'Modern Physics', duration: '1.5 hours', completed: false },
        { subject: 'Chemistry', topic: 'Inorganic Chemistry', duration: '2 hours', completed: false },
        { subject: 'Mathematics', topic: 'Probability', duration: '1.5 hours', completed: false }
      ]
    }
  ];

  const weakAreas = [
    { subject: 'Physics', topic: 'Thermodynamics', accuracy: '65%', priority: 'High' },
    { subject: 'Chemistry', topic: 'Coordination Compounds', accuracy: '58%', priority: 'High' },
    { subject: 'Mathematics', topic: '3D Geometry', accuracy: '72%', priority: 'Medium' },
    { subject: 'Physics', topic: 'Waves & Sound', accuracy: '78%', priority: 'Medium' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-olive-50/90 backdrop-blur-md border-b border-olive-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Sparkles className="h-8 w-8 text-olive-700" />
                <span className="text-2xl font-bold text-olive-800 font-serif">Puddle</span>
              </Link>
              <div className="hidden md:block text-sm text-olive-600 italic">
                Where curiosity makes ripples
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link href="/exams" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Exams
              </Link>
              <Link href="/tests" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Mock Tests
              </Link>
              <Link href="/pricing" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing
              </Link>
              <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                About
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <button className="relative p-2 text-olive-700 hover:text-olive-900">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-olive-700 hover:text-olive-900">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-olive-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  R
                </div>
              </div>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-olive-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-olive-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link href="/exams" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <GraduationCap className="h-5 w-5" />
                  Exams
                </Link>
                <Link href="/tests" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <FileText className="h-5 w-5" />
                  Mock Tests
                </Link>
                <Link href="/pricing" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </Link>
                <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <BookOpen className="h-5 w-5" />
                  About
                </Link>
                <div className="pt-4 border-t border-olive-200">
                  <button className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Back to Home Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center text-olive-700 hover:text-olive-900 font-medium group">
          <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Rahul!</h1>
              <p className="text-gray-600 mt-2">Here's your learning progress and recommendations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="font-semibold text-gray-900">Preparing for: JEE Main 2024</div>
                <div className="text-sm text-gray-600">Next mock test: Tomorrow, 10 AM</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-olive-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Recent Tests */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-olive-100 p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <div className={`text-sm font-medium ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'emerald' ? 'text-emerald-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-amber-600'
                  }`}>
                    {stat.change} from last week
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Performance Trend</h2>
                <select className="px-3 py-1 rounded-lg border border-olive-200 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 72, 68, 75, 78, 82, 85].map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full rounded-t-lg ${
                        index === 6 
                          ? 'bg-gradient-to-t from-olive-500 to-emerald-500' 
                          : 'bg-gradient-to-t from-olive-400 to-emerald-400'
                      }`}
                      style={{ height: `${value * 0.7}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">Day {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tests */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Tests</h2>
                <Link href="/tests" className="text-olive-600 hover:text-olive-700 font-medium text-sm flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border border-olive-100 rounded-lg hover:bg-olive-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        test.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-amber-100 text-amber-600'
                      }`}>
                        {test.status === 'completed' ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{test.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{test.date}</span>
                          <span>•</span>
                          <span>Time: {test.timeSpent}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{test.score}</div>
                      {test.percentile !== '-' && (
                        <div className="text-sm text-gray-600">{test.percentile} percentile</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Study Plan & Weak Areas */}
          <div className="space-y-8">
            {/* Study Plan */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Study Plan</h2>
                <Link href="/plan" className="text-olive-600 hover:text-olive-700 font-medium text-sm">
                  Edit
                </Link>
              </div>
              <div className="space-y-4">
                {studyPlan[0].tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-olive-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        task.completed 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {task.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{task.subject}</div>
                        <div className="text-sm text-gray-600">{task.topic}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{task.duration}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-dashed border-olive-200 text-olive-700 rounded-lg hover:bg-olive-50 transition font-medium">
                + Add More Tasks
              </button>
            </div>

            {/* Weak Areas */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Areas to Improve</h2>
                <Link href="/analytics" className="text-olive-600 hover:text-olive-700 font-medium text-sm flex items-center gap-1">
                  Details <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {weakAreas.map((area, index) => (
                  <div key={index} className="p-3 border border-olive-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-gray-900">{area.subject}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        area.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {area.priority}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{area.topic}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Accuracy: {area.accuracy}</div>
                      <button className="text-sm text-olive-600 hover:text-olive-700 font-medium">
                        Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-xl border border-olive-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/tests" className="bg-white p-4 rounded-lg border border-olive-100 hover:border-olive-300 transition-colors text-center">
                  <div className="inline-flex p-2 rounded-lg bg-blue-100 text-blue-600 mb-2">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Take Test</div>
                </Link>
                <Link href="/guides" className="bg-white p-4 rounded-lg border border-olive-100 hover:border-olive-300 transition-colors text-center">
                  <div className="inline-flex p-2 rounded-lg bg-emerald-100 text-emerald-600 mb-2">
                    <BookOpenIcon className="h-5 w-5" />
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Study Material</div>
                </Link>
                <Link href="/analytics" className="bg-white p-4 rounded-lg border border-olive-100 hover:border-olive-300 transition-colors text-center">
                  <div className="inline-flex p-2 rounded-lg bg-purple-100 text-purple-600 mb-2">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Analytics</div>
                </Link>
                <Link href="/schedule" className="bg-white p-4 rounded-lg border border-olive-100 hover:border-olive-300 transition-colors text-center">
                  <div className="inline-flex p-2 rounded-lg bg-amber-100 text-amber-600 mb-2">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Schedule</div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Study Recommendation</h3>
                <p className="text-gray-700">
                  Based on your performance, we recommend focusing on <strong>Thermodynamics</strong> and <strong>Coordination Compounds</strong> today.
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition whitespace-nowrap">
              View Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-olive-800 to-emerald-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Sparkles className="h-8 w-8 text-emerald-300" />
                  <h3 className="text-2xl font-bold font-serif">Puddle</h3>
                </Link>
              </div>
              <p className="text-emerald-200 text-sm">
                Start with a splash where every curiosity makes a ripple!
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/exams" className="hover:text-white">Exams</Link></li>
                <li><Link href="/tests" className="hover:text-white">Mock Tests</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white">Study Guides</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-300 text-sm">
            © {new Date().getFullYear()} Puddle. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}