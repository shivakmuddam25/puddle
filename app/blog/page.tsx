// app/blog/page.tsx
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
  Calendar,
  User as UserIcon,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Award,
  MessageSquare,
  Share2,
  Heart
} from 'lucide-react';
import { useState } from 'react';

export default function BlogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "How to Crack JEE Main 2024 in First Attempt",
      excerpt: "Learn the strategies and study plans that helped toppers secure top ranks in JEE Main.",
      author: "Dr. Sharma",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      category: "JEE Preparation",
      imageColor: "from-blue-400 to-cyan-500"
    },
    {
      id: 2,
      title: "NEET Biology: Mastering Human Physiology",
      excerpt: "Complete guide to scoring 180/180 in Biology section with focused preparation strategies.",
      author: "Dr. Patel",
      date: "Jan 12, 2024",
      readTime: "10 min read",
      category: "NEET Tips",
      imageColor: "from-emerald-400 to-green-500"
    },
    {
      id: 3,
      title: "10th Board Exams: Last Minute Revision Strategy",
      excerpt: "Effective last-minute preparation tips for CBSE 10th board exams to score above 95%.",
      author: "Prof. Gupta",
      date: "Jan 10, 2024",
      readTime: "6 min read",
      category: "School Exams",
      imageColor: "from-amber-400 to-orange-500"
    },
    {
      id: 4,
      title: "CAT Quant: Shortcut Formulas You Must Know",
      excerpt: "Essential formulas and time-saving techniques for CAT quantitative aptitude section.",
      author: "MBA Expert",
      date: "Jan 8, 2024",
      readTime: "12 min read",
      category: "MBA Prep",
      imageColor: "from-purple-400 to-pink-500"
    },
    {
      id: 5,
      title: "Time Management for Competitive Exams",
      excerpt: "Learn how to manage study hours effectively while preparing for multiple exams.",
      author: "Study Coach",
      date: "Jan 5, 2024",
      readTime: "7 min read",
      category: "Study Tips",
      imageColor: "from-indigo-400 to-blue-500"
    },
    {
      id: 6,
      title: "Building Strong Foundations in Mathematics",
      excerpt: "Essential concepts every student should master from classes 6-10 for future success.",
      author: "Maths Guru",
      date: "Jan 3, 2024",
      readTime: "9 min read",
      category: "Foundation",
      imageColor: "from-red-400 to-rose-500"
    }
  ];

  const categories = [
    { name: "JEE Preparation", count: 24, color: "bg-blue-100 text-blue-800" },
    { name: "NEET Tips", count: 18, color: "bg-emerald-100 text-emerald-800" },
    { name: "School Exams", count: 32, color: "bg-amber-100 text-amber-800" },
    { name: "MBA Prep", count: 15, color: "bg-purple-100 text-purple-800" },
    { name: "Study Tips", count: 28, color: "bg-indigo-100 text-indigo-800" },
    { name: "Foundation", count: 21, color: "bg-rose-100 text-rose-800" }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Puddle Blog</h1>
            <p className="text-xl text-olive-100 mb-8">
              Expert insights, study tips, and success stories for competitive exam preparation
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search articles..."
                className="flex-1 px-6 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-white text-olive-900 font-semibold px-6 py-3 rounded-lg hover:bg-olive-50 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-olive-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-48 bg-gradient-to-br ${post.imageColor} relative`}>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        post.category === "JEE Preparation" ? "bg-blue-100 text-blue-800" :
                        post.category === "NEET Tips" ? "bg-emerald-100 text-emerald-800" :
                        post.category === "School Exams" ? "bg-amber-100 text-amber-800" :
                        post.category === "MBA Prep" ? "bg-purple-100 text-purple-800" :
                        post.category === "Study Tips" ? "bg-indigo-100 text-indigo-800" :
                        "bg-rose-100 text-rose-800"
                      }`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <UserIcon className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/blog/${post.id}`}
                        className="text-olive-600 hover:text-olive-700 font-medium flex items-center gap-2"
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                      <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-rose-500">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-500">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      num === 1
                        ? 'bg-olive-600 text-white'
                        : 'border border-olive-200 text-gray-700 hover:bg-olive-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button className="w-10 h-10 rounded-lg border border-olive-200 text-gray-700 hover:bg-olive-50">
                  ...
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-olive-50 transition-colors group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-olive-700">
                      {category.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${category.color}`}>
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-xl border border-olive-100 p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Popular Posts</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                    <div className="flex items-start gap-3">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${post.imageColor} flex-shrink-0`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-olive-700 line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-xl border border-olive-200 p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Subscribe to Newsletter</h3>
              <p className="text-gray-600 mb-4">
                Get weekly study tips and exam preparation strategies
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg border border-olive-200 mb-3"
              />
              <button className="w-full bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">
                Subscribe
              </button>
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
                <li><Link href="/blog" className="hover:text-white font-semibold">Blog</Link></li>
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