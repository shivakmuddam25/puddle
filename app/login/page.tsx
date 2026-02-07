// app/login/page.tsx
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Home,
  GraduationCap,
  FileText,
  DollarSign,
  User,
  Users,
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
  Shield,
  School,
  Briefcase,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState<'student' | 'parent'>('student');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Create a ref for the form section to scroll to
  const formRef = useRef<HTMLDivElement>(null);

  const handleSignUpClick = () => {
    // Only allow sign-up for parents
    if (userType === 'parent') {
      setIsLogin(false);
      
      // Scroll to the form section
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
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

  const handleGoogleLogin = () => {
    // Navigate to Google/Gmail login
    // In a real app, you would use OAuth or similar
    // For now, we'll redirect to a Google login page
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile&state=YOUR_STATE_PARAM';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isLogin && userType === 'parent') {
        // Parent Sign Up
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          setIsLoading(false);
          return;
        }

        // Validation
        if (!formData.parentName || !formData.email || !formData.password) {
          alert('Please fill in all required fields');
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.parentName,
            email: formData.email,
            password: formData.password,
            childName: formData.childName,
            userType: 'parent'
          }),
        });

        if (response.ok) {
          // Redirect to parent dashboard
          router.push('/parent-dashboard');
        } else {
          const error = await response.json();
          alert(error.error || 'Registration failed. Please try again.');
        }
      } else {
        // Login (both student and parent)
        if (!formData.email || !formData.password) {
          alert('Please enter email and password');
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            userType: userType
          }),
        });

		if (response.ok) {
		  const data = await response.json();
		  
		  // Store user info in localStorage for dashboard
		  localStorage.setItem('user', JSON.stringify(data.user));
		  
		  // Redirect based on user type
		  if (userType === 'student') {
			router.push('/student-dashboard');
		  } else {
			router.push('/parent-dashboard');
		  }
		}
		else {
          const error = await response.json();
          alert(error.error || 'Invalid email or password. Please try again.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
              {/* Sign Up button only shown for parent mode */}
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
                  {/* Mobile Sign Up button */}
                  <button 
                    onClick={() => {
                      if (userType === 'parent') {
                        handleSignUpClick();
                        setIsMenuOpen(false);
                      }
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
                  {userType === 'student' ? 'Student Login' : isLogin ? 'Welcome Back' : 'Parent Registration'}
                </h1>
                <p className="text-gray-600">
                  {userType === 'student' 
                    ? 'Sign in with your student account' 
                    : isLogin 
                      ? 'Sign in to monitor your child\'s progress' 
                      : 'Create your parent account to start monitoring'
                  }
                </p>
              </div>

              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => {
                    setUserType('student');
                    setIsLogin(true); // Students can only login
                  }}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                    userType === 'student' 
                      ? 'border-olive-500 bg-olive-50 shadow-md' 
                      : 'border-gray-200 hover:border-olive-300 hover:bg-olive-50/50'
                  }`}
                >
                  <div className={`p-3 rounded-full mb-4 ${
                    userType === 'student' 
                      ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white' 
                      : 'bg-olive-100 text-olive-600'
                  }`}>
                    <School className="h-8 w-8" />
                  </div>
                  <span className="font-semibold text-gray-900 mb-1">Student</span>
                  <span className="text-sm text-gray-600 text-center">
                    For learners preparing for exams
                  </span>
                  {userType === 'student' && (
                    <div className="mt-4 w-3 h-3 rounded-full bg-olive-500"></div>
                  )}
                </button>

                <button
                  onClick={() => setUserType('parent')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                    userType === 'parent' 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className={`p-3 rounded-full mb-4 ${
                    userType === 'parent' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Users className="h-8 w-8" />
                  </div>
                  <span className="font-semibold text-gray-900 mb-1">Parent</span>
                  <span className="text-sm text-gray-600 text-center">
                    For parents monitoring child's progress
                  </span>
                  {userType === 'parent' && (
                    <div className="mt-4 w-3 h-3 rounded-full bg-blue-500"></div>
                  )}
                </button>
              </div>

              {/* Only show toggle for parents */}
              {userType === 'parent' && (
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
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
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
                    className={`flex-1 py-3 text-center font-medium rounded-r-lg border transition-all ${
                      !isLogin 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    } ${!isLogin ? 'ring-2 ring-offset-2 ring-blue-300 animate-pulse' : ''}`}
                  >
                    <UserPlus className="h-5 w-5 inline-block mr-2" />
                    Sign Up
                  </button>
                </div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && userType === 'parent' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                          required={!isLogin && userType === 'parent'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Child's Name (Optional)
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          placeholder="Enter your child's name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-colors ${
                        userType === 'student' 
                          ? 'focus:border-olive-500 focus:ring-olive-100' 
                          : 'focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-colors ${
                        userType === 'student' 
                          ? 'focus:border-olive-500 focus:ring-olive-100' 
                          : 'focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      required
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

                {!isLogin && userType === 'parent' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        required={!isLogin && userType === 'parent'}
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
                        className="h-4 w-4 border-gray-300 rounded focus:ring-2"
                        style={{
                          borderColor: userType === 'student' ? '#6b7280' : '#3b82f6',
                          color: userType === 'student' ? '#4d7c0f' : '#3b82f6'
                        }}
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <Link href="/forgot-password" className="text-sm hover:underline"
                      style={{ color: userType === 'student' ? '#4d7c0f' : '#3b82f6' }}>
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  } ${
                    userType === 'student'
                      ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    userType === 'student' 
                      ? 'Student Login' 
                      : isLogin 
                        ? 'Parent Login' 
                        : 'Create Parent Account'
                  )}
                </button>

                {!isLogin && userType === 'parent' && (
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 border-gray-300 rounded focus:ring-2 mt-1"
                      style={{
                        borderColor: '#3b82f6',
                        color: '#3b82f6'
                      }}
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
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

              {/* Social Login - Only Google */}
              <div className="mb-8">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                </button>
              </div>

              {/* Only show switch mode for parents */}
              {userType === 'parent' && (
                <div className="text-center text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      // Scroll to form after switching mode
                      setTimeout(() => {
                        formRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isLogin ? 'Sign up now' : 'Sign in'}
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Features */}
            <div className="space-y-8">
              {/* Student/Parent Specific Benefits */}
              <div className={`rounded-2xl p-8 border ${
                userType === 'student' 
                  ? 'bg-gradient-to-r from-olive-50 to-emerald-50 border-olive-200'
                  : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
              }`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {userType === 'student' ? 'Student Portal' : isLogin ? 'Parent Dashboard' : 'Parent Benefits'}
                </h2>
                <div className="space-y-6">
                  {userType === 'student' ? (
                    <>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-olive-200 flex items-center justify-center text-olive-600">
                            <Brain className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">AI-Powered Study Plans</h3>
                          <p className="text-sm text-gray-600 mt-1">Personalized learning paths based on your performance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-olive-200 flex items-center justify-center text-olive-600">
                            <Award className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Performance Analytics</h3>
                          <p className="text-sm text-gray-600 mt-1">Track progress with detailed insights and reports</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-olive-200 flex items-center justify-center text-olive-600">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Exam Preparation</h3>
                          <p className="text-sm text-gray-600 mt-1">Comprehensive material for JEE, NEET, UPSC, and more</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-olive-200 flex items-center justify-center text-olive-600">
                            <FileText className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Mock Tests</h3>
                          <p className="text-sm text-gray-600 mt-1">Practice with AI-generated tests and real exam simulations</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600">
                            <UserCheck className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Child Progress Monitoring</h3>
                          <p className="text-sm text-gray-600 mt-1">Track your child's learning journey in real-time</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600">
                            <Award className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Performance Reports</h3>
                          <p className="text-sm text-gray-600 mt-1">Weekly/monthly progress reports emailed to you</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600">
                            <Shield className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Parental Controls</h3>
                          <p className="text-sm text-gray-600 mt-1">Set study limits and monitor screen time</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600">
                            <Briefcase className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Teacher Communication</h3>
                          <p className="text-sm text-gray-600 mt-1">Connect with educators for feedback and guidance</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-olive-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">What Our {userType === 'student' ? 'Students' : 'Parents'} Say</h3>
                <div className="space-y-4">
                  {userType === 'student' ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                        <p className="text-gray-700 italic">
                          "As a working parent, I can easily monitor my child's progress through the parent dashboard."
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-8 h-8 rounded-full bg-blue-200"></div>
                          <div>
                            <div className="font-medium text-gray-900">Mr. Sharma</div>
                            <div className="text-sm text-gray-600">Parent of Class 10 Student</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-cyan-50/50 rounded-lg p-4 border border-cyan-100">
                        <p className="text-gray-700 italic">
                          "The progress reports help me stay involved in my daughter's JEE preparation journey."
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-200"></div>
                          <div>
                            <div className="font-medium text-gray-900">Mrs. Verma</div>
                            <div className="text-sm text-gray-600">Parent of NEET Aspirant</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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