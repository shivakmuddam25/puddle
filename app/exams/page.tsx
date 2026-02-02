// app/exams/page.tsx
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
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Brain,
  Award,
  Calculator,
  FlaskConical,
  BookOpen as BookOpenIcon,
  Globe,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';

export default function ExamsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const examCategories = [
    {
      id: 'school',
      name: 'School Exams',
      icon: <BookOpenIcon className="h-6 w-6" />,
      description: 'CBSE, ICSE, State Boards',
      color: 'from-blue-400 to-cyan-500',
      count: 8
    },
    {
      id: 'engineering',
      name: 'Engineering',
      icon: <Brain className="h-6 w-6" />,
      description: 'JEE, BITSAT, State CET',
      color: 'from-purple-400 to-pink-500',
      count: 6
    },
    {
      id: 'medical',
      name: 'Medical',
      icon: <FlaskConical className="h-6 w-6" />,
      description: 'NEET, AIIMS, JIPMER',
      color: 'from-emerald-400 to-green-500',
      count: 4
    },
    {
      id: 'management',
      name: 'Management',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'CAT, MAT, XAT',
      color: 'from-amber-400 to-orange-500',
      count: 5
    },
    {
      id: 'foundation',
      name: 'Foundation',
      icon: <Award className="h-6 w-6" />,
      description: 'Classes 6-10',
      color: 'from-rose-400 to-red-500',
      count: 12
    }
  ];

  const exams = [
    {
      id: 1,
      name: 'JEE Main 2024',
      category: 'engineering',
      description: 'Joint Entrance Examination for NITs, IIITs, and other engineering colleges',
      students: '1.2M',
      questions: '10K+',
      duration: '3 hours',
      difficulty: 'High',
      color: 'purple'
    },
    {
      id: 2,
      name: 'NEET UG 2024',
      category: 'medical',
      description: 'National Eligibility cum Entrance Test for medical courses',
      students: '950K',
      questions: '8K+',
      duration: '3.5 hours',
      difficulty: 'High',
      color: 'emerald'
    },
    {
      id: 3,
      name: 'CBSE Class 12',
      category: 'school',
      description: 'Central Board of Secondary Education Class 12 Board Exams',
      students: '1.5M',
      questions: '5K+',
      duration: '3 hours',
      difficulty: 'Medium',
      color: 'blue'
    },
    {
      id: 4,
      name: 'CAT 2024',
      category: 'management',
      description: 'Common Admission Test for IIMs and top MBA colleges',
      students: '250K',
      questions: '6K+',
      duration: '3 hours',
      difficulty: 'Very High',
      color: 'amber'
    },
    {
      id: 5,
      name: 'Foundation - Class 9',
      category: 'foundation',
      description: 'Complete syllabus for CBSE Class 9 with advanced concepts',
      students: '500K',
      questions: '4K+',
      duration: '2 hours',
      difficulty: 'Medium',
      color: 'rose'
    },
    {
      id: 6,
      name: 'BITSAT 2024',
      category: 'engineering',
      description: 'Birla Institute of Technology and Science Admission Test',
      students: '180K',
      questions: '3K+',
      duration: '3 hours',
      difficulty: 'High',
      color: 'purple'
    },
    {
      id: 7,
      name: 'Class 10 ICSE',
      category: 'school',
      description: 'Indian Certificate of Secondary Education Class 10 Exams',
      students: '350K',
      questions: '4K+',
      duration: '2.5 hours',
      difficulty: 'Medium',
      color: 'blue'
    },
    {
      id: 8,
      name: 'AIIMS MBBS',
      category: 'medical',
      description: 'All India Institute of Medical Sciences Entrance Exam',
      students: '120K',
      questions: '5K+',
      duration: '3.5 hours',
      difficulty: 'Very High',
      color: 'emerald'
    }
  ];

  const filteredExams = activeCategory === 'all' 
    ? exams 
    : exams.filter(exam => exam.category === activeCategory);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Browse All Exams</h1>
            <p className="text-xl text-olive-100 mb-8">
              Comprehensive preparation for school, competitive, and entrance exams
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900"
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-olive-900 font-semibold px-6 py-3 rounded-lg hover:bg-olive-50 transition">
                <Filter className="h-5 w-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Exam Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Exam Categories</h2>
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white'
                  : 'border border-olive-300 text-olive-700 hover:bg-olive-50'
              }`}
            >
              View All
            </button>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {examCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border transition-all ${
                  activeCategory === category.id
                    ? 'border-olive-500 bg-olive-50 shadow-md'
                    : 'border-olive-100 bg-white hover:border-olive-300 hover:shadow-sm'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} text-white mb-3`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="text-xs font-medium text-olive-700">
                  {category.count} exams
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Exams' : examCategories.find(c => c.id === activeCategory)?.name + ' Exams'}
              <span className="text-lg text-gray-600 font-normal ml-2">({filteredExams.length})</span>
            </h2>
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-lg border border-olive-200">
                <option>Sort by: Popular</option>
                <option>Sort by: Name</option>
                <option>Sort by: Difficulty</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-xl border border-olive-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-2 ${
                        exam.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        exam.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                        exam.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        exam.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{exam.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        exam.difficulty === 'Very High' ? 'bg-red-100 text-red-800' :
                        exam.difficulty === 'High' ? 'bg-amber-100 text-amber-800' :
                        exam.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {exam.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{exam.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-xs">Students</span>
                      </div>
                      <div className="font-bold text-gray-900">{exam.students}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                        <FileText className="h-4 w-4" />
                        <span className="text-xs">Questions</span>
                      </div>
                      <div className="font-bold text-gray-900">{exam.questions}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs">Duration</span>
                      </div>
                      <div className="font-bold text-gray-900">{exam.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/exams/${exam.id}`}
                      className="flex-1 bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition text-center"
                    >
                      Start Preparation
                    </Link>
                    <button className="px-4 border border-olive-300 text-olive-700 rounded-lg hover:bg-olive-50 transition">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 border border-olive-200">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-olive-700 mb-2">35+</div>
              <div className="text-gray-700">Exams Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-olive-700 mb-2">50K+</div>
              <div className="text-gray-700">Practice Questions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-olive-700 mb-2">2M+</div>
              <div className="text-gray-700">Students Prepared</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-olive-700 mb-2">95%</div>
              <div className="text-gray-700">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Start Your Preparation?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully prepared for their exams with Puddle's comprehensive study materials and AI-powered tests.
          </p>
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
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
                <li><Link href="/exams" className="hover:text-white font-semibold">Exams</Link></li>
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