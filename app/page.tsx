// app/page.tsx - WITH ACTUAL OLIVE COLOR APPLICATIONS
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
  Leaf,
  TreePine,
  Sprout,
  Droplets,
  Trophy
} from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
  

    <div className="min-h-screen bg-white">
      {/* Navigation Bar - Fixed at Top WITH OLIVE COLORS */}
      <nav className="sticky top-0 z-50 bg-olive-50/90 backdrop-blur-md border-b border-olive-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-olive-700" />
                <span className="text-2xl font-bold text-olive-800 font-serif">Puddle</span>
              </div>
              <div className="hidden md:block text-sm text-olive-600 italic">
                Where curiosity makes ripples
              </div>
            </div>

            {/* Desktop Navigation */}
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
              <Link href="/dashboard" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Dashboard
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:inline-flex items-center gap-2 text-olive-700 hover:text-olive-900 font-medium">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:from-olive-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg">
                <Sprout className="h-4 w-4 mr-2" />
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
                <Link href="/dashboard" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <User className="h-5 w-5" />
                  Dashboard
                </Link>
                <div className="pt-4 border-t border-olive-200">
                  <Link href="/login" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - WITH OLIVE COLORS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-50 via-emerald-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Grid Layout for Hero */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                {/* Brand Tagline */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-olive-100 to-emerald-100 px-4 py-2 rounded-full">
                  <Droplets className="h-4 w-4 text-olive-600" />
                  <span className="text-sm font-medium text-olive-700">
                    AI-Powered + Subject Matter Experts Learning Platform
                  </span>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Ace Your <span className="text-olive-600">Competitive</span> Exams
                </h1>
                
                {/* Subheadline */}
                <p className="text-xl text-gray-600">
                  Intelligent mock tests, personalized study plans, and real-time analytics 
                  for JEE, NEET, UPSC, CAT, and more.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register" className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-medium bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:from-olive-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link href="#demo" className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-medium border-2 border-olive-500 text-olive-600 hover:bg-olive-50 transition-all">
                    Watch Demo
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-olive-700">50,000+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-olive-700">4.9/5</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Dashboard Card */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-olive-100">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-olive-50 to-emerald-50 p-6 border-b border-olive-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">Live Mock Test</h3>
                        <p className="text-sm text-olive-600">JEE Main 2024 - Physics</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white text-olive-700 px-3 py-2 rounded-lg">
                        <Clock className="h-4 w-4" />
                        <span className="font-bold">02:45:12</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Progress Section */}
                    <div className="space-y-6 mb-8">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Accuracy</span>
                          <span className="text-sm font-bold text-olive-600">87%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-400 to-olive-500 rounded-full" style={{ width: '87%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Speed</span>
                          <span className="text-sm font-bold text-olive-600">2.1 min/Q</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-olive-400 to-emerald-500 rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-olive-50 p-4 rounded-xl text-center border border-olive-100">
                        <div className="text-2xl font-bold text-olive-700">85%</div>
                        <div className="text-sm text-gray-600">Physics</div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-xl text-center border border-emerald-100">
                        <div className="text-2xl font-bold text-emerald-700">90%</div>
                        <div className="text-sm text-gray-600">Chemistry</div>
                      </div>
                      <div className="bg-lime-50 p-4 rounded-xl text-center border border-lime-100">
                        <div className="text-2xl font-bold text-lime-700">80%</div>
                        <div className="text-sm text-gray-600">Maths</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-xl text-center border border-amber-100">
                        <div className="text-2xl font-bold text-amber-700">AIR 245</div>
                        <div className="text-sm text-gray-600">Rank</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Footer */}
                  <div className="bg-gray-50 p-4 border-t border-olive-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-medium text-gray-700">Topper&apos;s Choice</span>
                      </div>
                      <div className="text-xs text-gray-500">Updated just now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section - WITH OLIVE COLORS */}
      <section className="py-12 bg-gradient-to-r from-olive-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-olive-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Search className="h-6 w-6 text-olive-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Find What You Need to Learn</h2>
                </div>
                <p className="text-gray-600">
                  Search across 10,000+ questions, 500+ video lectures, and expert-curated content
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-olive-400" />
                <input
                  type="text"
                  placeholder="Search for topics, questions, or exams..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-olive-200 rounded-xl focus:border-olive-500 focus:ring-4 focus:ring-olive-100 outline-none transition-all"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-olive-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
              
              {/* Trending Topics */}
              <div className="flex items-center gap-2 text-sm text-olive-700">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Trending:</span>
                {['Integration Calculus', 'Organic Chemistry', 'Indian Polity'].map((topic, i) => (
                  <span key={topic}>
                    <button className="hover:text-olive-800 transition-colors">
                      {topic}
                    </button>
                    {i < 2 && <span className="text-olive-300 mx-2">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exams Section - WITH OLIVE COLORS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Prepare for Your <span className="text-olive-600">Dream Exam</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation materials for India&apos;s top competitive exams
            </p>
          </div>

          {/* Exams Grid - Proper Card Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                exam: 'JEE Main & Advanced',
                desc: 'Engineering entrance preparation',
                students: '2.5L+',
                color: 'olive',
                icon: '📐'
              },
              {
                exam: 'NEET UG',
                desc: 'Medical entrance exam',
                students: '1.8L+',
                color: 'emerald',
                icon: '🧬'
              },
              {
                exam: 'UPSC CSE',
                desc: 'Civil services examination',
                students: '85K+',
                color: 'teal',
                icon: '🏛️'
              },
              {
                exam: 'CAT & MBA',
                desc: 'Management entrance',
                students: '75K+',
                color: 'lime',
                icon: '📈'
              }
            ].map((exam) => (
              <div key={exam.exam} className="group bg-white rounded-xl border border-olive-100 p-6 hover:shadow-xl hover:border-olive-200 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-3xl p-3 rounded-lg ${
                    exam.color === 'olive' ? 'bg-olive-100 text-olive-600' :
                    exam.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    exam.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                    'bg-lime-100 text-lime-600'
                  }`}>
                    {exam.icon}
                  </div>
                  <TrendingUp className="h-5 w-5 text-gray-400 group-hover:text-olive-500 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">{exam.exam}</h3>
                <p className="text-gray-600 mb-4">{exam.desc}</p>
                
                <div className="flex items-center gap-2 text-sm text-olive-700 mb-4">
                  <Users className="h-4 w-4" />
                  <span>{exam.students} students</span>
                </div>
                
                <button className="w-full py-2 border border-olive-300 text-olive-700 rounded-lg font-medium hover:bg-olive-50 transition-colors">
                  Explore Course
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-lg font-medium border-2 border-olive-500 text-olive-600 hover:bg-olive-50 transition-all">
              View All 25+ Exams
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - WITH OLIVE COLORS */}
      <section className="py-20 bg-gradient-to-b from-olive-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-olive-600">Puddle</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology combined with proven teaching methodologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8 text-white" />,
                title: "Adaptive Learning",
                description: "AI adjusts question difficulty based on your performance",
                gradient: "from-olive-500 to-emerald-500"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-white" />,
                title: "Real Analytics",
                description: "Comprehensive performance tracking with All-India rank comparison",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: <Brain className="h-8 w-8 text-white" />,
                title: "AI-Powered Tests",
                description: "Intelligent mock tests that simulate actual exam patterns",
                gradient: "from-teal-500 to-cyan-500"
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Expert Community",
                description: "Connect with top educators, toppers, and fellow aspirants",
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-white" />,
                title: "Proctored Exams",
                description: "AI-powered proctoring for authentic exam experience",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: <LineChart className="h-8 w-8 text-white" />,
                title: "College Predictor",
                description: "AI predicts your chances based on mock test performance",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-olive-200 transition-all">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="text-sm text-olive-600 font-medium hover:text-olive-700 flex items-center gap-1">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - WITH OLIVE COLORS */}
      <section className="py-20 bg-gradient-to-r from-olive-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1M+", label: "Questions Bank", icon: <BookText className="h-8 w-8" /> },
              { value: "95%", label: "Success Rate", icon: <TrendingUp className="h-8 w-8" /> },
              { value: "50K+", label: "Active Students", icon: <Users className="h-8 w-8" /> },
              { value: "4.9", label: "Platform Rating", icon: <Star className="h-8 w-8" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - WITH OLIVE COLORS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-olive-600">Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing for every aspirant&apos;s needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "₹0",
                period: "/forever",
                description: "Basic access to get started",
                features: ["10 Mock Tests", "Basic Analytics", "Community Support", "Limited Questions"],
                cta: "Get Started",
                popular: false,
                gradient: "from-gray-100 to-gray-50"
              },
              {
                name: "Pro",
                price: "₹2,999",
                period: "/year",
                description: "Most popular for serious aspirants",
                features: ["Unlimited Mock Tests", "Advanced Analytics", "AI-Powered Recommendations", "Priority Support", "All-India Ranking"],
                cta: "Buy Now",
                popular: true,
                gradient: "from-olive-500 to-emerald-500"
              },
              {
                name: "Premium",
                price: "₹4,999",
                period: "/year",
                description: "For ultimate preparation",
                features: ["Everything in Pro", "One-on-One Mentoring", "Proctored Tests", "College Predictor", "Certificate of Excellence"],
                cta: "Contact Sales",
                popular: false,
                gradient: "from-teal-100 to-emerald-50"
              }
            ].map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl border-2 ${
                plan.popular ? 'border-olive-500 shadow-2xl transform scale-105' : 'border-gray-200'
              } p-6 relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-olive-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6 pt-4">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-3 rounded-lg font-medium transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:opacity-90 shadow-lg' 
                    : 'border-2 border-olive-500 text-olive-600 hover:bg-olive-50'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - WITH OLIVE COLORS */}
      <footer className="bg-gradient-to-r from-olive-800 to-emerald-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="h-8 w-8 text-emerald-300" />
                <h3 className="text-2xl font-bold font-serif">Puddle</h3>
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
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white">Study Guides</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-300 text-sm">
            © {new Date().getFullYear()} Puddle. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}