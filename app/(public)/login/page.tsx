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
  ChevronRight,
  Calendar
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    childName: '',
    grade: '',
    school: ''
  });

  const formRef = useRef<HTMLDivElement>(null);

  const handleSignUpClick = () => {
    setIsLogin(false);
    setErrorMessage(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignInClick = () => {
    setIsLogin(true);
    setErrorMessage(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoogleLogin = () => {
    // You'll need to implement Google OAuth with your API
    window.location.href = '/api/auth/google';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

// app/login/page.tsx - Update the handleSubmit function

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setErrorMessage(null);

  try {
    // Client‑side validation (keep your existing validation code)
    if (!isLogin) {
      // Sign‑up mode
      if (userType === 'student') {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

        if (age < 18) {
          setErrorMessage('You must be at least 18 years old to register without a parent.');
          setIsLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setErrorMessage('Passwords do not match!');
          setIsLoading(false);
          return;
        }

        if (!formData.fullName || !formData.email || !formData.password || !formData.dateOfBirth) {
          setErrorMessage('Please fill in all required fields');
          setIsLoading(false);
          return;
        }
      } else {
        // Parent sign‑up
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage('Passwords do not match!');
          setIsLoading(false);
          return;
        }
        if (!formData.fullName || !formData.email || !formData.password) {
          setErrorMessage('Please fill in all required fields');
          setIsLoading(false);
          return;
        }
      }
    } else {
      // Login mode
      if (!formData.email || !formData.password) {
        setErrorMessage('Please enter email and password');
        setIsLoading(false);
        return;
      }
    }

    // Prepare API payload
    const payload: any = {
      email: formData.email,
      password: formData.password,
      userType
    };

    if (!isLogin) {
      if (userType === 'student') {
        payload.name = formData.fullName;
        payload.dateOfBirth = formData.dateOfBirth;
        payload.grade = formData.grade || undefined;
        payload.school = formData.school || undefined;
      } else {
        payload.name = formData.fullName;
        payload.childName = formData.childName || undefined;
      }
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      // Store the auth token - THIS IS THE CRITICAL FIX
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', userType);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', data.user.name || formData.fullName || formData.email.split('@')[0]);

      // For student login, also store any existing grade/board if available
      if (userType === 'student' && data.user) {
        if (data.user.grade) localStorage.setItem('studentGrade', data.user.grade);
        if (data.user.gradeLevel) localStorage.setItem('studentGradeLevel', data.user.gradeLevel.toString());
        if (data.user.board) localStorage.setItem('studentBoard', data.user.board);
        if (data.user.boardId) localStorage.setItem('studentBoardId', data.user.boardId);
        if (data.user.id) localStorage.setItem('studentId', data.user.id);
        if (data.user.name) localStorage.setItem('studentName', data.user.name);
      }

      // Show success message for registration
      if (!isLogin) {
        alert('Registration successful! You can now login.');
      }

      // Redirect based on user type
      if (userType === 'student') {
        router.push('/student-dashboard');
      } else {
        router.push('/parent-dashboard');
      }
    } else {
      setErrorMessage(data.error || 'Authentication failed');
    }
  } catch (error) {
    console.error('Auth error:', error);
    setErrorMessage('An error occurred. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white">
      {/* Back to Home */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center text-olive-700 hover:text-olive-900 font-medium group">
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
                  {userType === 'student'
                    ? isLogin ? 'Student Login' : 'Student Registration'
                    : isLogin ? 'Welcome Back' : 'Parent Registration'}
                </h1>
                <p className="text-gray-600">
                  {userType === 'student'
                    ? isLogin
                      ? 'Sign in to your student account'
                      : 'Create your student account (must be 18+)'
                    : isLogin
                      ? 'Sign in to monitor your child\'s progress'
                      : 'Create your parent account to start monitoring'}
                </p>
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                </div>
              )}

              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => {
                    setUserType('student');
                    setIsLogin(true);
                    setErrorMessage(null);
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
                  <span className="text-sm text-gray-600 text-center">For learners preparing for exams</span>
                </button>

                <button
                  onClick={() => {
                    setUserType('parent');
                    setErrorMessage(null);
                  }}
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
                  <span className="text-sm text-gray-600 text-center">For parents monitoring child's progress</span>
                </button>
              </div>

              {/* Login/Signup Toggle */}
              <div className="flex mb-8">
                <button
                  onClick={handleSignInClick}
                  className={`flex-1 py-3 text-center font-medium rounded-l-lg border ${
                    isLogin
                      ? userType === 'student'
                        ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white border-olive-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <LogIn className="h-5 w-5 inline-block mr-2" />
                  Login
                </button>
                <button
                  onClick={handleSignUpClick}
                  className={`flex-1 py-3 text-center font-medium rounded-r-lg border ${
                    !isLogin
                      ? userType === 'student'
                        ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white border-olive-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserPlus className="h-5 w-5 inline-block mr-2" />
                  Sign Up
                </button>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Extra fields for sign‑up */}
                {!isLogin && (
                  <>
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-colors"
                          style={{
                            borderColor: userType === 'student' ? '#e5e7eb' : '#e5e7eb',
                            focusBorderColor: userType === 'student' ? '#4d7c0f' : '#3b82f6'
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* Student-only fields */}
                    {userType === 'student' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              max={new Date().toISOString().split('T')[0]}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none"
                              required
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">You must be 18 or older to register independently.</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Grade (Optional)</label>
                          <input
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            placeholder="e.g., 12, College"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">School (Optional)</label>
                          <input
                            type="text"
                            name="school"
                            value={formData.school}
                            onChange={handleInputChange}
                            placeholder="Enter your school name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* Parent-only fields */}
                    {userType === 'parent' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Child's Name (Optional)</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="childName"
                            value={formData.childName}
                            onChange={handleInputChange}
                            placeholder="Enter your child's name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm your password"
                          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-colors"
                          style={{
                            borderColor: userType === 'student' ? '#e5e7eb' : '#e5e7eb',
                            focusBorderColor: userType === 'student' ? '#4d7c0f' : '#3b82f6'
                          }}
                          required
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
                  </>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-colors"
                      style={{
                        borderColor: userType === 'student' ? '#e5e7eb' : '#e5e7eb',
                        focusBorderColor: userType === 'student' ? '#4d7c0f' : '#3b82f6'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-colors"
                      style={{
                        borderColor: userType === 'student' ? '#e5e7eb' : '#e5e7eb',
                        focusBorderColor: userType === 'student' ? '#4d7c0f' : '#3b82f6'
                      }}
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

                {/* Login-only options */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 border-gray-300 rounded focus:ring-2"
                        style={{ color: userType === 'student' ? '#4d7c0f' : '#3b82f6' }}
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm hover:underline"
                      style={{ color: userType === 'student' ? '#4d7c0f' : '#3b82f6' }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Submit button */}
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
                    <>
                      {isLogin
                        ? (userType === 'student' ? 'Student Login' : 'Parent Login')
                        : (userType === 'student' ? 'Create Student Account' : 'Create Parent Account')}
                    </>
                  )}
                </button>

                {/* Terms for sign-up */}
                {!isLogin && (
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 border-gray-300 rounded focus:ring-2 mt-1"
                      style={{ color: userType === 'student' ? '#4d7c0f' : '#3b82f6' }}
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="hover:underline" style={{ color: userType === 'student' ? '#4d7c0f' : '#3b82f6' }}>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="hover:underline" style={{ color: userType === 'student' ? '#4d7c0f' : '#3b82f6' }}>
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

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Continue with Google</span>
              </button>

              {/* Switch between login/signup */}
              <div className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrorMessage(null);
                  }}
                  className="font-medium hover:underline"
                  style={{ color: userType === 'student' ? '#4d7c0f' : '#3b82f6' }}
                >
                  {isLogin ? 'Sign up now' : 'Sign in'}
                </button>
              </div>
            </div>

            {/* Right Column - Features (keep your existing features content) */}
            <div className="hidden lg:block">
              {/* Add your features content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}