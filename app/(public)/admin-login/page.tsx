// app/admin-login/page.tsx
"use client"

import Link from 'next/link';
import { 
  Home,
  LogIn,
  Menu,
  X,
  ChevronLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Edit3,
  Eye as EyeIcon,
  Palette,
  Layout,
  Users,
  CheckCircle,
  Key,
  UserCog,
  ArrowRight,
  AlertCircle,
  Building,
  Briefcase,
  ClipboardCheck
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'creator' | 'reviewer' | 'designer' | 'admin'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Refs
  const formRef = useRef<HTMLDivElement>(null);

  // Sample credentials for demonstration
  const demoCredentials = {
    creator: { email: 'creator@puddle.com', password: 'creator123' },
    reviewer: { email: 'reviewer@puddle.com', password: 'reviewer123' },
    designer: { email: 'designer@puddle.com', password: 'designer123' },
    admin: { email: 'admin@puddle.com', password: 'admin123' }
  };

  const roleConfig = {
    creator: {
      title: 'Content Creator',
      description: 'Create educational content, questions, and study materials',
      icon: <Edit3 className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    reviewer: {
      title: 'Reviewer',
      description: 'Quality assurance and content validation',
      icon: <EyeIcon className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    },
    designer: {
      title: 'Graphics Designer',
      description: 'Design visual content and learning materials',
      icon: <Palette className="h-8 w-8" />,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700'
    },
    admin: {
      title: 'Administrator',
      description: 'Platform management and user administration',
      icon: <Layout className="h-8 w-8" />,
      color: 'from-gray-700 to-gray-900',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700'
    }
  };

  // Auto-fill demo credentials when role changes
  useEffect(() => {
    const creds = demoCredentials[selectedRole];
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
    setSuccess('');
  }, [selectedRole]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Simple validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // Check against demo credentials
      const expectedCreds = demoCredentials[selectedRole];
      if (email === expectedCreds.email && password === expectedCreds.password) {
        setSuccess(`Login successful! Redirecting to ${roleConfig[selectedRole].title} dashboard...`);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to respective dashboard
        router.push(`/dashboard/${selectedRole}`);
      } else {
        throw new Error('Invalid credentials for selected role');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (role: 'creator' | 'reviewer' | 'designer' | 'admin') => {
    setSelectedRole(role);
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    
    // Auto-submit after a brief delay
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const submitEvent = new Event('submit', { cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-800 font-serif">Puddle</span>
                  <span className="text-xs text-gray-600 italic -mt-1">Admin Portal</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Student Login
              </Link>
              <Link href="/admin-docs" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Documentation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-3 px-4 py-2">
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-3 px-4 py-2">
                  <Users className="h-5 w-5" />
                  Student Login
                </Link>
                <Link href="/admin-docs" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-3 px-4 py-2">
                  <ClipboardCheck className="h-5 w-5" />
                  Documentation
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Back to Home Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium group"
        >
          <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Login Form */}
            <div ref={formRef} className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mb-4">
                  <Key className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Admin Portal Login
                </h1>
                <p className="text-gray-600">
                  Secure access for authorized personnel only
                </p>
              </div>

              {/* Role Selection */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Your Role</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['creator', 'reviewer', 'designer', 'admin'] as const).map((role) => {
                    const config = roleConfig[role];
                    return (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          selectedRole === role 
                            ? `${config.bgColor} border-gray-800 shadow-md` 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg mb-2 ${
                          selectedRole === role 
                            ? `bg-gradient-to-br ${config.color} text-white` 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {config.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900 text-center">{config.title}</span>
                        {selectedRole === role && (
                          <div className="mt-2 w-2 h-2 rounded-full bg-gray-800"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Role Info */}
              <div className={`mb-8 p-4 rounded-xl ${roleConfig[selectedRole].bgColor} border ${roleConfig[selectedRole].borderColor}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${roleConfig[selectedRole].color}`}>
                    {roleConfig[selectedRole].icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{roleConfig[selectedRole].title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{roleConfig[selectedRole].description}</p>
                  </div>
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">{success}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-gray-800 focus:ring-2 focus:ring-gray-100 outline-none transition-colors"
                      required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:border-gray-800 focus:ring-2 focus:ring-gray-100 outline-none transition-colors"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-gray-800 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <Link href="/admin-forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Login as {roleConfig[selectedRole].title}
                    </>
                  )}
                </button>
              </form>

              {/* Quick Login Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Quick Login (Demo)</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(['creator', 'reviewer', 'designer', 'admin'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => handleQuickLogin(role)}
                      disabled={isLoading}
                      className={`py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                        selectedRole === role
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      {roleConfig[role].title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Demo Credentials</h3>
                <div className="space-y-2">
                  {Object.entries(demoCredentials).map(([role, creds]) => (
                    <div key={role} className="text-xs text-gray-600">
                      <span className="font-medium capitalize">{role}:</span>{' '}
                      {creds.email} / {creds.password}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  ⚠️ These are demo credentials. In production, use actual credentials.
                </p>
              </div>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">Security Notice</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      This portal is restricted to authorized personnel only. All login attempts are logged and monitored.
                      Unauthorized access is prohibited and may result in legal action.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="space-y-8">
              {/* Portal Information */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Admin Portal Access</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Building className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Platform Management</h3>
                      <p className="text-gray-300 mt-1 text-sm">
                        Manage users, content, and platform settings from a centralized dashboard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Role-Based Access</h3>
                      <p className="text-gray-300 mt-1 text-sm">
                        Different permissions and features based on your assigned role
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <ClipboardCheck className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Audit Trail</h3>
                      <p className="text-gray-300 mt-1 text-sm">
                        All actions are logged for security and compliance purposes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Descriptions */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Role Descriptions</h3>
                <div className="space-y-6">
                  {(['creator', 'reviewer', 'designer', 'admin'] as const).map((role) => {
                    const config = roleConfig[role];
                    return (
                      <div 
                        key={role}
                        className={`p-4 rounded-xl border ${selectedRole === role ? 'ring-2 ring-offset-2 ring-gray-800' : ''} ${config.bgColor} ${config.borderColor}`}
                        onClick={() => setSelectedRole(role)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color}`}>
                            {config.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{config.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                            <div className="mt-3 text-xs text-gray-500">
                              <span className="font-medium">Permissions:</span>{' '}
                              {role === 'creator' && 'Content creation, question bank management'}
                              {role === 'reviewer' && 'Content approval, quality checks'}
                              {role === 'designer' && 'Media upload, graphic design tools'}
                              {role === 'admin' && 'Full system access, user management'}
                            </div>
                          </div>
                          {selectedRole === role && (
                            <CheckCircle className="h-5 w-5 text-gray-800" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">IT Support</div>
                      <div className="text-sm text-gray-600">support@puddle.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserCog className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Admin Contact</div>
                      <div className="text-sm text-gray-600">superadmin@puddle.com</div>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/admin-docs" 
                  className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-gray-300" />
              <div>
                <h3 className="font-bold">Puddle Admin Portal</h3>
                <p className="text-gray-400 text-sm">Secure access management system</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Puddle 
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Version 2.1.0 • Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}