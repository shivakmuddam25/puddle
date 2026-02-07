// app/page.tsx - WITH ORIGINAL LOGO DESIGN
"use client"

import Link from 'next/link'
import { 
  ArrowRight, 
  Users, 
  Star, 
  Target, 
  BarChart3,
  CheckCircle,
  Award,
  Clock,
  TrendingUp,
  Shield,
  Search,
  ChevronRight,
  ShieldCheck,
  Brain,
  LineChart,
  BookText,
  Menu,
  X,
  Home,
  GraduationCap,
  FileText,
  DollarSign,
  User,
  LogIn,
  BookOpen,
  School,
  Globe,
  Calculator,
  Microscope,
  BookMarked,
  Palette,
  Edit3,
  Eye,
  Layout,
  Sparkles,
  Trophy,
  Info,
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showStudyLevels, setShowStudyLevels] = useState(false)
  
  // Refs for click outside detection
  const studyLevelsDropdownRef = useRef<HTMLDivElement>(null)
  const studyLevelsButtonRef = useRef<HTMLButtonElement>(null)

  // Handle click outside for study levels dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close study levels dropdown if clicked outside
      if (
        showStudyLevels && 
        studyLevelsDropdownRef.current && 
        !studyLevelsDropdownRef.current.contains(event.target as Node) &&
        studyLevelsButtonRef.current &&
        !studyLevelsButtonRef.current.contains(event.target as Node)
      ) {
        setShowStudyLevels(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showStudyLevels])

  // Function to handle study levels hover
  const handleStudyLevelsHover = (open: boolean) => {
    setShowStudyLevels(open)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar - Fixed at Top WITH ORIGINAL LOGO */}
      <nav className="sticky top-0 z-50 bg-olive-50/90 backdrop-blur-md border-b border-olive-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - ORIGINAL DESIGN FROM YOUR FILE */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                {/* Original Logo with Sparkles icon */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-olive-400 to-emerald-400 rounded-full blur opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-olive-500 to-emerald-600 p-2 rounded-full">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-olive-800 font-serif tracking-tight">Puddle</span>
                  <span className="text-xs text-olive-600 italic -mt-1">Where curiosity makes ripples</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
              
              {/* Dropdown for Study Levels - Hover enabled */}
              <div className="relative">
                <button 
                  ref={studyLevelsButtonRef}
                  onMouseEnter={() => handleStudyLevelsHover(true)}
                  onMouseLeave={() => handleStudyLevelsHover(false)}
                  onClick={() => handleStudyLevelsHover(!showStudyLevels)}
                  className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2"
                >
                  <School className="h-4 w-4" />
                  Study Levels
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showStudyLevels && (
                  <div 
                    ref={studyLevelsDropdownRef}
                    onMouseEnter={() => handleStudyLevelsHover(true)}
                    onMouseLeave={() => handleStudyLevelsHover(false)}
                    className="absolute w-64 bg-white shadow-xl rounded-lg border border-olive-100 mt-2 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-olive-100 bg-olive-50">
                      <div className="text-sm font-bold text-olive-800">Choose Your Learning Path</div>
                    </div>
                    <Link 
                      href="/k12" 
                      className="flex items-center gap-3 px-4 py-4 hover:bg-olive-50 text-gray-700 transition-colors group"
                      onClick={() => setShowStudyLevels(false)}
                    >
                      <div className="p-2 bg-olive-100 rounded-lg group-hover:bg-olive-200 transition-colors">
                        <BookMarked className="h-5 w-5 text-olive-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">6-10, K-12 (Intermediate) Students</div>
                        <div className="text-xs text-gray-500">School curriculum for Grades 1-12</div>
                      </div>
                    </Link>
                    <Link 
                      href="/college" 
                      className="flex items-center gap-3 px-4 py-4 hover:bg-emerald-50 text-gray-700 transition-colors group"
                      onClick={() => setShowStudyLevels(false)}
                    >
                      <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                        <School className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">College Students</div>
                        <div className="text-xs text-gray-500">Degree programs and courses</div>
                      </div>
                    </Link>
                    <Link 
                      href="/competitive" 
                      className="flex items-center gap-3 px-4 py-4 hover:bg-amber-50 text-gray-700 transition-colors group"
                      onClick={() => setShowStudyLevels(false)}
                    >
                      <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                        <Target className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Competitive Exams</div>
                        <div className="text-xs text-gray-500">JEE, NEET, UPSC, and more</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

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
                <HelpCircle className="h-4 w-4" />
                About
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              {/* Simple Login Link without dropdown */}
              <Link href="/login" className="hidden md:inline-flex items-center gap-2 text-olive-700 hover:text-olive-900 font-medium">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              
              <Link href="/register" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:from-olive-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Start Free Trial
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-olive-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-olive-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                
                <div className="px-4">
                  <div className="text-sm font-medium text-olive-700 mb-2">Study Levels:</div>
                  <div className="space-y-2 pl-4">
                    <Link 
                      href="/k12" 
                      className="text-olive-600 hover:text-olive-900 font-medium flex items-center gap-3 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BookMarked className="h-4 w-4" />
                      6-10, K-12 (Intermediate) Students
                    </Link>
                    <Link 
                      href="/college" 
                      className="text-olive-600 hover:text-olive-900 font-medium flex items-center gap-3 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <School className="h-4 w-4" />
                      College Students
                    </Link>
                    <Link 
                      href="/competitive" 
                      className="text-olive-600 hover:text-olive-900 font-medium flex items-center gap-3 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Target className="h-4 w-4" />
                      Competitive Exams
                    </Link>
                  </div>
                </div>
                
                <Link 
                  href="/exams" 
                  className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GraduationCap className="h-5 w-5" />
                  Exams
                </Link>
                <Link 
                  href="/tests" 
                  className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  Mock Tests
                </Link>
                <Link 
                  href="/pricing" 
                  className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </Link>
                <Link 
                  href="/about" 
                  className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                  About
                </Link>
                
                <div className="pt-4 border-t border-olive-200 px-4">
                  <Link 
                    href="/login" 
                    className="block w-full text-center bg-olive-500 text-white py-3 rounded-lg font-medium hover:bg-olive-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with original brand message */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-50 via-emerald-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Grid Layout for Hero */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                {/* Brand Tagline - Consistent with original */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-olive-100 to-emerald-100 px-4 py-2 rounded-full">
                  <Sparkles className="h-4 w-4 text-olive-600" />
                  <span className="text-sm font-medium text-olive-700">
                    AI-Powered & Subject Matter Expert's Curated Learning Platform
                  </span>
                </div>
                
                {/* Main Headline - Updated but keeping original style */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Ace Your <span className="text-olive-600">Competitive</span> Exams
                </h1>
                
                {/* Subheadline - Original style with expanded content */}
                <p className="text-xl text-gray-600">
                  Intelligent mock tests, personalized study plans, and real-time analytics 
                  for 6-10, K-12 (Intermediate), College, JEE, NEET, UPSC, CAT, and more.
                </p>
                
                {/* Target Audience Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-olive-100">
                    <div className="inline-flex p-2 bg-olive-100 rounded-lg mb-2">
                      <School className="h-5 w-5 text-olive-600" />
                    </div>
                    <div className="font-medium text-gray-900">6-10, K-12 (Intermediate)</div>
                    <div className="text-xs text-gray-600">School Curriculum</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-olive-100">
                    <div className="inline-flex p-2 bg-emerald-100 rounded-lg mb-2">
                      <School className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="font-medium text-gray-900">College</div>
                    <div className="text-xs text-gray-600">Degree Programs</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-olive-100">
                    <div className="inline-flex p-2 bg-amber-100 rounded-lg mb-2">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="font-medium text-gray-900">Exams</div>
                    <div className="text-xs text-gray-600">JEE, NEET, UPSC</div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="/register" className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-medium bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:from-olive-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link href="#demo" className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-medium border-2 border-olive-500 text-olive-600 hover:bg-olive-50 transition-all">
                    Watch Demo
                  </Link>
                </div>
              </div>
              
              {/* Right Column - Multi-Level Dashboard */}
              <div className="space-y-6">
                {/* 6-10, K-12 (Intermediate) Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-olive-100 transform hover:scale-[1.02] transition-transform">
                  <div className="bg-gradient-to-r from-olive-50 to-emerald-50 p-4 border-b border-olive-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-olive-100 rounded-lg">
                        <School className="h-5 w-5 text-olive-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Grade 10 - Science</h3>
                        <p className="text-sm text-olive-600">CBSE Curriculum</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-olive-700">92%</div>
                        <div className="text-xs text-gray-600">Physics</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-700">88%</div>
                        <div className="text-xs text-gray-600">Chemistry</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* College Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 transform hover:scale-[1.02] transition-transform">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 border-b border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <School className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">B.Tech 2nd Year</h3>
                        <p className="text-sm text-emerald-600">Engineering</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-700">85%</div>
                        <div className="text-xs text-gray-600">Maths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-700">78%</div>
                        <div className="text-xs text-gray-600">Programming</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Competitive Exam Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100 transform hover:scale-[1.02] transition-transform">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Target className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">JEE Main Mock Test</h3>
                        <p className="text-sm text-amber-600">AIR: 245</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-700">94%</div>
                        <div className="text-xs text-gray-600">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-700">2.1m/Q</div>
                        <div className="text-xs text-gray-600">Speed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Levels Section */}
      <section className="py-20 bg-gradient-to-b from-white to-olive-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              For Every <span className="text-olive-600">Learning Stage</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive learning solutions tailored to different educational needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 6-10, K-12 (Intermediate) Card */}
            <div className="bg-white rounded-2xl border border-olive-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-olive-500 to-emerald-500 p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <School className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">6-10, K-12 (Intermediate) School</h3>
                    <p className="text-olive-100">Grades 1-12</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {['CBSE/ICSE Curriculum', 'Smart Worksheets', 'Animated Videos', 'Parent Dashboard', 'Progress Tracking'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/k12" className="block text-center bg-olive-50 text-olive-700 py-3 rounded-lg font-medium hover:bg-olive-100 transition-colors">
                  Explore 6-10, K-12 (Intermediate)
                </Link>
              </div>
            </div>
            
            {/* College Card */}
            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <School className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">College</h3>
                    <p className="text-emerald-100">Degree Programs</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {['B.Tech/B.E. Courses', 'Medical (MBBS)', 'Commerce Stream', 'Arts & Humanities', 'Semester Prep'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/college" className="block text-center bg-emerald-50 text-emerald-700 py-3 rounded-lg font-medium hover:bg-emerald-100 transition-colors">
                  Explore College
                </Link>
              </div>
            </div>
            
            {/* Competitive Exams Card */}
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Target className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Competitive Exams</h3>
                    <p className="text-amber-100">Professional Aspirations</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {['JEE Main & Advanced', 'NEET UG & PG', 'UPSC Civil Services', 'CAT/MBA Entrance', 'GATE Engineering'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/competitive" className="block text-center bg-amber-50 text-amber-700 py-3 rounded-lg font-medium hover:bg-amber-100 transition-colors">
                  Explore Exams
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exams Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-olive-600">Exam Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preparation for India&apos;s most sought-after examinations
            </p>
          </div>

          {/* Exams Grid with Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                exam: 'School Boards',
                desc: 'CBSE, ICSE, State Boards',
                icon: <School className="h-6 w-6" />,
                color: 'olive',
                level: '6-10, K-12 (Intermediate)'
              },
              {
                exam: 'Engineering',
                desc: 'JEE, BITSAT, VITEEE',
                icon: <Calculator className="h-6 w-6" />,
                color: 'emerald',
                level: 'Competitive'
              },
              {
                exam: 'Medical',
                desc: 'NEET, AIIMS, JIPMER',
                icon: <Microscope className="h-6 w-6" />,
                color: 'teal',
                level: 'Competitive'
              },
              {
                exam: 'Civil Services',
                desc: 'UPSC, State PSC',
                icon: <Globe className="h-6 w-6" />,
                color: 'amber',
                level: 'Professional'
              },
              {
                exam: 'Management',
                desc: 'CAT, XAT, GMAT',
                icon: <TrendingUp className="h-6 w-6" />,
                color: 'blue',
                level: 'Professional'
              },
              {
                exam: 'Law Entrance',
                desc: 'CLAT, AILET, LSAT',
                icon: <BookText className="h-6 w-6" />,
                color: 'purple',
                level: 'Professional'
              },
              {
                exam: 'Defence',
                desc: 'NDA, CDS, AFCAT',
                icon: <Shield className="h-6 w-6" />,
                color: 'red',
                level: 'Competitive'
              },
              {
                exam: 'Science & Research',
                desc: 'IISER, NEST, JGEEBILS',
                icon: <Brain className="h-6 w-6" />,
                color: 'indigo',
                level: 'Research'
              }
            ].map((exam) => (
              <div key={exam.exam} className="group bg-white rounded-xl border border-olive-100 p-6 hover:shadow-xl hover:border-olive-200 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${exam.color === 'olive' ? 'bg-olive-100 text-olive-600' : exam.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : exam.color === 'teal' ? 'bg-teal-100 text-teal-600' : exam.color === 'amber' ? 'bg-amber-100 text-amber-600' : exam.color === 'blue' ? 'bg-blue-100 text-blue-600' : exam.color === 'purple' ? 'bg-purple-100 text-purple-600' : exam.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    {exam.icon}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    exam.level === '6-10, K-12 (Intermediate)' ? 'bg-olive-100 text-olive-800' :
                    exam.level === 'Competitive' ? 'bg-emerald-100 text-emerald-800' :
                    exam.level === 'Professional' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {exam.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">{exam.exam}</h3>
                <p className="text-gray-600 mb-4">{exam.desc}</p>
                
                <button className="w-full py-2 border border-olive-300 text-olive-700 rounded-lg font-medium hover:bg-olive-50 transition-colors">
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-olive-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Learners Choose <span className="text-olive-600">Puddle</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From school students to competitive exam aspirants - we support every learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-white" />,
                title: "Adaptive Learning Path",
                description: "AI creates personalized study plans based on learning style and pace",
                gradient: "from-olive-500 to-emerald-500"
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Multi-Level Support",
                description: "Dedicated platforms for 6-10, K-12 (Intermediate), college, and competitive exam preparation",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-white" />,
                title: "Progress Analytics",
                description: "Detailed insights for students, parents, and educators",
                gradient: "from-teal-500 to-cyan-500"
              },
              {
                icon: <BookOpen className="h-8 w-8 text-white" />,
                title: "Rich Content Library",
                description: "Interactive videos, practice questions, and mock tests",
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-white" />,
                title: "Safe Learning Environment",
                description: "Child-safe platform with parental controls for 6-10, K-12 (Intermediate) students",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: <Trophy className="h-8 w-8 text-white" />,
                title: "Achievement Recognition",
                description: "Certificates, badges, and rewards for learning milestones",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-olive-200 transition-all">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with original logo */}
      <footer className="bg-gradient-to-r from-olive-800 to-emerald-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {/* Original logo in footer */}
                <div className="bg-gradient-to-br from-olive-500 to-emerald-600 p-2 rounded-full">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif">Puddle</h3>
                  <p className="text-emerald-200 text-sm">Where curiosity makes ripples</p>
                </div>
              </div>
              <p className="text-emerald-200 text-sm mt-2">
                Empowering learners at every stage - from school to success.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Learning Levels</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/k12" className="hover:text-white">6-10, K-12 (Intermediate) School</Link></li>
                <li><Link href="/college" className="hover:text-white">College Programs</Link></li>
                <li><Link href="/competitive" className="hover:text-white">Competitive Exams</Link></li>
                <li><Link href="/professional" className="hover:text-white">Professional Courses</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/tests" className="hover:text-white">Mock Tests</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Join As</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/register" className="hover:text-white">Register</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-300 text-sm">
            © {new Date().getFullYear()} Puddle - All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}