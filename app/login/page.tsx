// app/login/page.tsx
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
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  BookOpen,
  Sparkles,
  Brain,
  Globe,
  Award,
  Shield
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function LoginPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Create a ref for the form section to scroll to
  const formRef = useRef<HTMLDivElement>(null);

  const handleSignUpClick = () => {
    // Switch to sign-up mode
    setIsLogin(false);
    
    // Scroll to the form section
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignInClick = () => {
    // Switch to login mode
    setIsLogin(true);
    
    // Scroll to the form section
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Navigation Bar - Consistent with Home Page */}
      <nav className="sticky top-0 z-50 bg-olive-50/90 backdrop-blur-md border-b border-olive-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Back to Home Link */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Sparkles className="h-8 w-8 text-olive-700" />
                <span className="text-2xl font-bold text-olive-800 font-serif">Puddle</span>
              </Link>
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
              <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                About
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              {/* Sign Up button that scrolls to form and switches mode */}
              <button 
                onClick={handleSignUpClick}
                className="hidden md:inline-flex items-center gap-2 text-olive-700 hover:text-olive-900 font-medium"
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </button>
              
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
                <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <BookOpen className="h-5 w-5" />
                  About
                </Link>
                <div className="pt-4 border-t border-olive-200">
                  {/* Mobile Sign Up button that scrolls to form */}
                  <button 
                    onClick={() => {
                      handleSignUpClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2"
                  >
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Back to Home Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-olive-700 hover:text-olive-900 font-medium group"
        >
          <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Auth Form */}
            <div ref={formRef} className="bg-white rounded-2xl border border-olive-100 shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {isLogin ? 'Welcome Back' : 'Join Puddle'}
                </h1>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to continue your learning journey' 
                    : 'Create your account to start your preparation'
                  }
                </p>
              </div>

              {/* Toggle between Login and Signup */}
              <div className="flex mb-8">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    if (!isLogin) {
                      // Smooth scroll when switching from sign-up to login
                      formRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`flex-1 py-3 text-center font-medium rounded-l-lg border ${
                    isLogin 
                      ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white border-olive-500' 
                      : 'border-olive-200 text-gray-600 hover:bg-olive-50'
                  }`}
                >
                  <LogIn className="h-5 w-5 inline-block mr-2" />
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    if (isLogin) {
                      // Smooth scroll when switching from login to sign-up
                      formRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`flex-1 py-3 text-center font-medium rounded-r-lg border ${
                    !isLogin 
                      ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white border-olive-500' 
                      : 'border-olive-200 text-gray-600 hover:bg-olive-50'
                  }`}
                >
                  <UserPlus className="h-5 w-5 inline-block mr-2" />
                  Sign Up
                </button>
              </div>

              {/* Auth Form */}
              <form className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-12 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-olive-600 border-olive-300 rounded focus:ring-olive-500"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-olive-600 hover:text-olive-700">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>

                {!isLogin && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-olive-600 border-olive-300 rounded focus:ring-olive-500"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-olive-600 hover:text-olive-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-olive-600 hover:text-olive-700">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                )}
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">Or continue with</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5" fill="#000000" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.93-1.27 4.88-2.11 5.86-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .41z"/>
                  </svg>
                  <span className="text-sm font-medium">Telegram</span>
                </button>
              </div>

              {/* Switch mode */}
              <div className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-olive-600 hover:text-olive-700 font-medium"
                >
                  {isLogin ? 'Sign up now' : 'Sign in'}
                </button>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 border border-olive-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Join Puddle?
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Brain className="h-6 w-6" />,
                      title: "AI-Powered Learning",
                      desc: "Personalized study plans based on your performance"
                    },
                    {
                      icon: <Award className="h-6 w-6" />,
                      title: "Certified Content",
                      desc: "Quality content reviewed by subject matter experts"
                    },
                    {
                      icon: <Globe className="h-6 w-6" />,
                      title: "WGEO Affiliated",
                      desc: "Recognized by World Green Economy Organization"
                    },
                    {
                      icon: <Shield className="h-6 w-6" />,
                      title: "Secure & Private",
                      desc: "Your data is protected with enterprise-grade security"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white border border-olive-200 flex items-center justify-center text-olive-600">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-olive-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">What Our Students Say</h3>
                <div className="space-y-4">
                  <div className="bg-olive-50/50 rounded-lg p-4 border border-olive-100">
                    <p className="text-gray-700 italic">
                      "Puddle's AI-powered tests helped me improve my JEE rank from 10,000 to 500!"
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-8 h-8 rounded-full bg-olive-200"></div>
                      <div>
                        <div className="font-medium text-gray-900">Rahul Sharma</div>
                        <div className="text-sm text-gray-600">JEE 2023 - AIR 245</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100">
                    <p className="text-gray-700 italic">
                      "The personalized study plans made my NEET preparation so much more efficient."
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-200"></div>
                      <div>
                        <div className="font-medium text-gray-900">Priya Patel</div>
                        <div className="text-sm text-gray-600">NEET 2023 - AIR 189</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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