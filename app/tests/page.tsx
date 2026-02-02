// app/tests/page.tsx
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
  Clock,
  Target,
  TrendingUp,
  Brain,
  Award,
  PlayCircle,
  BarChart3,
  Timer,
  CheckCircle,
  Filter,
  Search,
  ArrowRight,
  Zap,
  Shield,
  Users as UsersIcon,
  Star,
  Lock
} from 'lucide-react';
import { useState } from 'react';

export default function TestsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const testCategories = [
    {
      id: 'full-length',
      name: 'Full Length Tests',
      description: 'Complete exam simulation with actual exam pattern',
      count: 45,
      color: 'from-blue-400 to-cyan-500',
      features: ['Time-bound', 'Detailed Solutions', 'Performance Report']
    },
    {
      id: 'chapter-wise',
      name: 'Chapter Wise Tests',
      description: 'Topic-specific practice for targeted learning',
      count: 120,
      color: 'from-emerald-400 to-green-500',
      features: ['Concept Focused', 'Instant Feedback', 'Progress Tracking']
    },
    {
      id: 'previous-year',
      name: 'Previous Year Papers',
      description: 'Actual exam papers from past years',
      count: 35,
      color: 'from-purple-400 to-pink-500',
      features: ['Real Exam Pattern', 'Trend Analysis', 'Difficulty Level']
    },
    {
      id: 'speed',
      name: 'Speed Tests',
      description: 'Time-bound practice to improve solving speed',
      count: 60,
      color: 'from-amber-400 to-orange-500',
      features: ['Time Management', 'Quick Thinking', 'Accuracy Under Pressure']
    },
    {
      id: 'ai-recommended',
      name: 'AI Recommended Tests',
      description: 'Personalized tests based on learning patterns',
      count: 25,
      color: 'from-rose-400 to-red-500',
      features: ['Adaptive Difficulty', 'Weakness Targeting', 'Smart Recommendations']
    }
  ];

  const mockTests = [
    {
      id: 1,
      name: 'JEE Main 2024 - Complete Mock Series',
      category: 'full-length',
      exam: 'JEE Main',
      questions: '90 questions',
      duration: '3 hours',
      features: ['AI-Powered Analysis', 'All-India Ranking', 'Proctored Option'],
      popularity: 'High',
      rating: 4.8
    },
    {
      id: 2,
      name: 'NEET Physics - Chapter-wise Series',
      category: 'chapter-wise',
      exam: 'NEET UG',
      questions: '200+ questions',
      duration: 'Varies by chapter',
      features: ['NCERT Based', 'Diagrams Included', 'Concept Videos'],
      popularity: 'Very High',
      rating: 4.6
    },
    {
      id: 3,
      name: 'CAT Previous Year Papers (2018-2023)',
      category: 'previous-year',
      exam: 'CAT',
      questions: '6 full papers',
      duration: '3 hours each',
      features: ['Actual Exam Interface', 'Sectional Analysis', 'Video Solutions'],
      popularity: 'High',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Speed Master - Quantitative Aptitude',
      category: 'speed',
      exam: 'Multiple Exams',
      questions: '30 questions each',
      duration: '45 minutes',
      features: ['Speed Metrics', 'Accuracy Score', 'Time Management Tips'],
      popularity: 'Medium',
      rating: 4.5
    },
    {
      id: 5,
      name: 'AI Adaptive Test Series - JEE/NEET',
      category: 'ai-recommended',
      exam: 'JEE & NEET',
      questions: 'Adaptive',
      duration: '2-3 hours',
      features: ['Dynamic Difficulty', 'Personalized Questions', 'Progress Prediction'],
      popularity: 'Growing',
      rating: 4.7
    },
    {
      id: 6,
      name: 'Class 12 Board Exam Series',
      category: 'full-length',
      exam: 'CBSE 12th',
      questions: '70 questions',
      duration: '3 hours',
      features: ['Board Pattern', 'Sample Papers', 'Marking Scheme'],
      popularity: 'High',
      rating: 4.4
    }
  ];

  const filteredTests = activeFilter === 'all' 
    ? mockTests 
    : mockTests.filter(test => test.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-olive-800 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Mock Tests</h1>
            <p className="text-xl text-olive-100 mb-8">
              Experience the next generation of test preparation with intelligent, adaptive mock tests
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mock tests by exam or topic..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900"
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-olive-900 font-semibold px-6 py-3 rounded-lg hover:bg-olive-50 transition">
                <Filter className="h-5 w-5" />
                Filter Tests
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Test Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Test Categories</h2>
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white'
                  : 'border border-olive-300 text-olive-700 hover:bg-olive-50'
              }`}
            >
              View All Tests
            </button>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {testCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  activeFilter === category.id
                    ? 'border-olive-500 bg-olive-50 shadow-md'
                    : 'border-olive-100 bg-white hover:border-olive-300 hover:shadow-sm'
                }`}
              >
                <div className={`h-2 rounded-full bg-gradient-to-r ${category.color} mb-4`}></div>
                <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="space-y-1 mb-3">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                      <CheckCircle className="h-3 w-3 text-emerald-500" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="text-xs font-medium text-olive-700">
                  {category.count} tests available
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Our Tests Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 text-white mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Powered Analytics</h3>
              <p className="text-gray-600 mb-6">
                Get intelligent insights into your performance with detailed analytics that identify patterns and suggest improvements
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Available with Pro plan
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 border border-emerald-100">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 text-white mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Proctored Tests</h3>
              <p className="text-gray-600 mb-6">
                Experience authentic exam conditions with AI-powered proctoring that ensures fair practice and accurate assessment
              </p>
              <div className="text-sm text-emerald-600 font-medium">
                Included in Premium plan
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Real-time Performance</h3>
              <p className="text-gray-600 mb-6">
                Track your progress with detailed performance metrics and compare with thousands of other aspirants nationwide
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Available with all paid plans
              </div>
            </div>
          </div>
        </div>

        {/* Mock Tests Grid */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Test Series
              <span className="text-lg text-gray-600 font-normal ml-2">({filteredTests.length})</span>
            </h2>
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-lg border border-olive-200">
                <option>Sort by: Popularity</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Exam</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div key={test.id} className="bg-white rounded-xl border border-olive-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          test.category === 'full-length' ? 'bg-blue-100 text-blue-800' :
                          test.category === 'chapter-wise' ? 'bg-emerald-100 text-emerald-800' :
                          test.category === 'previous-year' ? 'bg-purple-100 text-purple-800' :
                          test.category === 'speed' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {test.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          test.popularity === 'Very High' ? 'bg-red-100 text-red-800' :
                          test.popularity === 'High' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {test.popularity}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{test.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">{test.exam}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="font-bold text-gray-900">{test.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{test.questions}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{test.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="text-sm font-medium text-gray-900">Key Features:</div>
                    {test.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-olive-500"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href="/login"
                      className="flex-1 bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition text-center"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Lock className="h-4 w-4" />
                        Login to Access
                      </span>
                    </Link>
                    <button className="px-4 border border-olive-300 text-olive-700 rounded-lg hover:bg-olive-50 transition">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 border border-olive-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience Smart Testing?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have improved their scores with our AI-powered mock tests. 
              Get personalized recommendations, detailed analytics, and real-time feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
              >
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/pricing" 
                className="inline-flex items-center justify-center gap-2 border-2 border-olive-500 text-olive-600 font-semibold px-8 py-3 rounded-lg hover:bg-olive-50 transition"
              >
                View Plans
              </Link>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Free trial includes access to 3 basic tests
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
                Where curiosity makes ripples
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/exams" className="hover:text-white">Exams</Link></li>
                <li><Link href="/tests" className="hover:text-white font-semibold">Mock Tests</Link></li>
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