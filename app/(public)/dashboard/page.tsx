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
  Brain,
  Trophy,
  CheckCircle,
  ArrowRight,
  Settings,
  Bell,
  Eye,
  Bookmark,
  LogOut,
  Users,
  Shield,
  Zap,
  LineChart,
  Target as TargetIcon,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const platformFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Learning",
      description: "Intelligent algorithms adapt to your learning style and pace",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Track progress with detailed performance insights and reports",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TargetIcon className="h-6 w-6" />,
      title: "Personalized Plans",
      description: "Custom study schedules based on your goals and weak areas",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Proctored Tests",
      description: "Authentic exam experience with AI-powered proctoring",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const upcomingExams = [
    {
      name: "JEE Main 2024",
      date: "Jan 24 - Feb 1, 2024",
      students: "1.2M registered",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "NEET UG 2024",
      date: "May 5, 2024",
      students: "950K registered",
      color: "bg-emerald-100 text-emerald-800"
    },
    {
      name: "CBSE Class 12",
      date: "Feb 15 - Apr 10, 2024",
      students: "1.5M appearing",
      color: "bg-purple-100 text-purple-800"
    },
    {
      name: "CAT 2024",
      date: "Nov 24, 2024",
      students: "250K expected",
      color: "bg-amber-100 text-amber-800"
    }
  ];

  const studyResources = [
    {
      type: "Mock Tests",
      count: "300+",
      description: "AI-powered tests with detailed analytics",
      icon: <FileText className="h-5 w-5" />
    },
    {
      type: "Study Guides",
      count: "150+",
      description: "Comprehensive PDF guides and notes",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      type: "Video Lectures",
      count: "500+ hours",
      description: "Recorded lectures by expert faculty",
      icon: <Eye className="h-5 w-5" />
    },
    {
      type: "Practice Questions",
      count: "10,000+",
      description: "Topic-wise question bank",
      icon: <Target className="h-5 w-5" />
    }
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
              <Link href="/login" className="hidden md:inline-flex items-center gap-2 text-olive-700 hover:text-olive-900 font-medium">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              
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
                <Link href="/login" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <LogIn className="h-5 w-5" />
                  Login
                </Link>
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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized learning hub for competitive exam preparation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Platform Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Platform Features */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {platformFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-olive-100 rounded-lg hover:shadow-sm transition-shadow">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Exams */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Exams</h2>
                <Link href="/exams" className="text-olive-600 hover:text-olive-700 font-medium text-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingExams.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-olive-100 rounded-lg hover:bg-olive-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${exam.color}`}>
                          {exam.name}
                        </span>
                        <span className="text-sm text-gray-500">{exam.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {exam.students}
                      </div>
                    </div>
                    <Link 
                      href={`/exams/${exam.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-4 py-2 bg-olive-100 text-olive-700 rounded-lg hover:bg-olive-200 transition text-sm font-medium"
                    >
                      Prepare
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-xl border border-olive-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Puddle Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-olive-200 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-olive-700">1</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Sign Up & Select Exam</h3>
                  <p className="text-gray-600 text-sm">Choose your target exam and create your study profile</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-olive-200 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-olive-700">2</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Take Diagnostic Test</h3>
                  <p className="text-gray-600 text-sm">Assess your current level and identify weak areas</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-olive-200 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-olive-700">3</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Follow AI Study Plan</h3>
                  <p className="text-gray-600 text-sm">Get personalized study schedule and track progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Resources & Stats */}
          <div className="space-y-8">
            {/* Study Resources */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Resources</h2>
              <div className="space-y-4">
                {studyResources.map((resource, index) => (
                  <div key={index} className="p-4 border border-olive-100 rounded-lg hover:bg-olive-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-olive-100 text-olive-600">
                          {resource.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{resource.type}</div>
                          <div className="text-sm text-gray-600">{resource.description}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-olive-700">{resource.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Statistics</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Active Students</span>
                    <span className="font-bold text-blue-700">50,000+</span>
                  </div>
                  <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Tests Completed</span>
                    <span className="font-bold text-emerald-700">2M+</span>
                  </div>
                  <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Success Rate</span>
                    <span className="font-bold text-amber-700">95%</span>
                  </div>
                  <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
              <div className="space-y-3">
                <Link 
                  href="/login" 
                  className="flex items-center justify-between p-3 border border-olive-100 rounded-lg hover:bg-olive-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-olive-100 to-emerald-100">
                      <LogIn className="h-5 w-5 text-olive-600" />
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-olive-700">
                      Login to Your Account
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-olive-600" />
                </Link>
                
                <Link 
                  href="/register" 
                  className="flex items-center justify-between p-3 border border-olive-100 rounded-lg hover:bg-olive-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      Create New Account
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </Link>
                
                <Link 
                  href="/tests" 
                  className="flex items-center justify-between p-3 border border-olive-100 rounded-lg hover:bg-olive-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-purple-700">
                      Browse Mock Tests
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-olive-800 to-emerald-800 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">Start Your Learning Journey Today</h2>
              <p className="text-olive-100">
                Join thousands of successful students who have aced their exams with Puddle
              </p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center gap-2 bg-white text-olive-900 font-semibold px-6 py-3 rounded-lg hover:bg-olive-50 transition"
              >
                Get Started Free
              </Link>
              <Link 
                href="/pricing" 
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Rahul Sharma</div>
                  <div className="text-sm text-gray-600">JEE 2023 - AIR 245</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Puddle's AI-powered tests helped me improve my rank from 10,000 to 500!"
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Priya Patel</div>
                  <div className="text-sm text-gray-600">NEET 2023 - AIR 189</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The personalized study plans made my preparation so much more efficient and effective."
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Amit Kumar</div>
                  <div className="text-sm text-gray-600">CAT 2023 - 99.8%ile</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The mock tests perfectly simulated the actual CAT exam. Couldn't have scored this without Puddle."
              </p>
            </div>
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