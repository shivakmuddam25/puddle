// app/guides/page.tsx
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
  Download,
  Clock,
  Target,
  CheckCircle,
  Video,
  FileText as FileTextIcon,
  Brain,
  Award,
  Users,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

export default function GuidesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const studyGuides = [
    {
      id: 1,
      title: "JEE Main Complete Syllabus Guide",
      description: "Detailed syllabus breakdown with important topics and weightage analysis",
      exams: ["JEE Main", "JEE Advanced"],
      grade: "11th & 12th",
      pages: 85,
      downloads: "2.5K",
      type: "PDF Guide",
      color: "blue"
    },
    {
      id: 2,
      title: "NEET Biology Revision Notes",
      description: "Complete chapter-wise notes with diagrams and important concepts",
      exams: ["NEET UG"],
      grade: "11th & 12th",
      pages: 120,
      downloads: "3.8K",
      type: "PDF Notes",
      color: "emerald"
    },
    {
      id: 3,
      title: "Class 10 Science Master Guide",
      description: "NCERT based comprehensive guide for CBSE board exams",
      exams: ["CBSE 10th"],
      grade: "10th",
      pages: 95,
      downloads: "1.2K",
      type: "Study Package",
      color: "amber"
    },
    {
      id: 4,
      title: "CAT Quantitative Aptitude",
      description: "Complete formulas, shortcuts and practice questions",
      exams: ["CAT", "MAT", "XAT"],
      grade: "Graduation",
      pages: 110,
      downloads: "850",
      type: "Practice Book",
      color: "purple"
    },
    {
      id: 5,
      title: "Physics Formulas Handbook",
      description: "All essential formulas from Mechanics to Modern Physics",
      exams: ["JEE", "NEET", "Board Exams"],
      grade: "9th-12th",
      pages: 65,
      downloads: "1.8K",
      type: "Quick Reference",
      color: "red"
    },
    {
      id: 6,
      title: "Chemistry Reactions Guide",
      description: "Important chemical reactions with mechanisms and applications",
      exams: ["JEE", "NEET"],
      grade: "11th & 12th",
      pages: 78,
      downloads: "1.5K",
      type: "Reaction Guide",
      color: "teal"
    }
  ];

  const examCategories = [
    {
      name: "School Exams",
      exams: ["CBSE 10th", "CBSE 12th", "ICSE", "State Boards"],
      count: 15,
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      name: "Engineering",
      exams: ["JEE Main", "JEE Advanced", "BITSAT", "State CET"],
      count: 8,
      icon: <Brain className="h-6 w-6" />
    },
    {
      name: "Medical",
      exams: ["NEET UG", "AIIMS", "JIPMER"],
      count: 5,
      icon: <Award className="h-6 w-6" />
    },
    {
      name: "Management",
      exams: ["CAT", "MAT", "XAT", "SNAP"],
      count: 6,
      icon: <Users className="h-6 w-6" />
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Study Guides & Resources</h1>
            <p className="text-xl text-olive-100 mb-8">
              Comprehensive study materials for school students and competitive exam aspirants
            </p>
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Search study guides..."
                className="flex-1 min-w-[200px] px-6 py-3 rounded-lg text-gray-900"
              />
              <select className="px-6 py-3 rounded-lg text-gray-900">
                <option>All Grades</option>
                <option>Class 6-8</option>
                <option>Class 9-10</option>
                <option>Class 11-12</option>
                <option>Graduation</option>
              </select>
              <button className="bg-white text-olive-900 font-semibold px-6 py-3 rounded-lg hover:bg-olive-50 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Exam Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Exam Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examCategories.map((category) => (
              <div key={category.name} className="bg-white rounded-xl border border-olive-100 p-6 hover:shadow-lg transition-shadow">
                <div className="inline-flex p-3 rounded-lg bg-olive-100 text-olive-600 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{category.name}</h3>
                <div className="space-y-2 mb-4">
                  {category.exams.map((exam) => (
                    <div key={exam} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                      {exam}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-olive-600 font-medium">
                  {category.count} Guides Available
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Guides Grid */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Study Guides</h2>
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-lg border border-olive-200">
                <option>Sort by: Popular</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Downloads</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl border border-olive-100 overflow-hidden hover:shadow-xl transition-all">
                <div className={`h-48 bg-gradient-to-br ${
                  guide.color === 'blue' ? 'from-blue-400 to-cyan-500' :
                  guide.color === 'emerald' ? 'from-emerald-400 to-green-500' :
                  guide.color === 'amber' ? 'from-amber-400 to-orange-500' :
                  guide.color === 'purple' ? 'from-purple-400 to-pink-500' :
                  guide.color === 'red' ? 'from-red-400 to-rose-500' :
                  'from-teal-400 to-cyan-500'
                } p-6 text-white relative`}>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {guide.type}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{guide.title}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4" />
                    <span>Grade: {guide.grade}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.exams.map((exam) => (
                      <span key={exam} className="px-3 py-1 bg-olive-100 text-olive-800 rounded-full text-sm">
                        {exam}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FileTextIcon className="h-4 w-4" />
                        <span>{guide.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{guide.downloads}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">
                      Download PDF
                    </button>
                    <button className="px-4 border border-olive-300 text-olive-700 rounded-lg hover:bg-olive-50 transition">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
              <div className="inline-flex p-3 rounded-lg bg-blue-100 text-blue-600 mb-4">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Video Lectures</h3>
              <p className="text-gray-600 mb-6">
                500+ hours of recorded lectures by expert faculty for comprehensive understanding
              </p>
              <Link href="/video-lectures" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                Explore Videos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 border border-emerald-100">
              <div className="inline-flex p-3 rounded-lg bg-emerald-100 text-emerald-600 mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Practice Tests</h3>
              <p className="text-gray-600 mb-6">
                10,000+ practice questions with detailed solutions and performance analytics
              </p>
              <Link href="/tests" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2">
                Take Tests <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-100">
              <div className="inline-flex p-3 rounded-lg bg-amber-100 text-amber-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Study Schedules</h3>
              <p className="text-gray-600 mb-6">
                Personalized study plans and timetables for efficient exam preparation
              </p>
              <Link href="/schedules" className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2">
                View Plans <ArrowRight className="h-4 w-4" />
              </Link>
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
                <li><Link href="/guides" className="hover:text-white font-semibold">Study Guides</Link></li>
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