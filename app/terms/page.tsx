// app/terms/page.tsx
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
  Shield,
  FileText as FileTextIcon,
  CheckCircle,
  AlertCircle,
  BookOpen as BookOpenIcon,
  Users,
  Globe,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

export default function TermsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="flex items-center gap-4 mb-6">
              <FileTextIcon className="h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl text-olive-100 mb-8">
              Last updated: January 15, 2024
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-olive-100 p-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-12">
                <p className="text-gray-700 text-lg">
                  Welcome to Puddle! These Terms of Service govern your use of our educational platform designed for school students and competitive exam preparation.
                </p>
              </div>

              <div className="space-y-12">
                <section>
                  <div className="flex items-start gap-4 mb-6">
                    <BookOpenIcon className="h-8 w-8 text-olive-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                      <p className="text-gray-700">
                        By accessing or using Puddle, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services. These terms apply to all users including students, parents, and educational institutions.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-start gap-4 mb-6">
                    <Users className="h-8 w-8 text-olive-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">2. User Accounts</h2>
                      <div className="space-y-4">
                        <div className="bg-olive-50 rounded-lg p-4">
                          <h3 className="font-bold text-gray-900 mb-2">Account Creation</h3>
                          <p className="text-gray-700 text-sm">
                            You must provide accurate and complete information when creating an account. For users under 13 years old, parental consent is required as per COPPA regulations.
                          </p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                          <h3 className="font-bold text-gray-900 mb-2">Account Security</h3>
                          <p className="text-gray-700 text-sm">
                            You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use of your account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-start gap-4 mb-6">
                    <Shield className="h-8 w-8 text-olive-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Service Usage</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3">Permitted Uses</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">Personal educational purposes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">Academic research and study</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">School/college assignments</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3">Prohibited Uses</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">Commercial redistribution</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">Content manipulation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">Unauthorized access</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-start gap-4 mb-6">
                    <Globe className="h-8 w-8 text-olive-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                          <p className="text-gray-700">
                            All content on Puddle including text, graphics, logos, tests, and study materials are owned by Puddle or its content providers and are protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.
                          </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-white border border-olive-100 rounded-lg p-4">
                            <h3 className="font-bold text-gray-900 mb-2">User Content</h3>
                            <p className="text-sm text-gray-600">
                              You retain rights to content you create, but grant us license to use it for educational purposes
                            </p>
                          </div>
                          <div className="bg-white border border-olive-100 rounded-lg p-4">
                            <h3 className="font-bold text-gray-900 mb-2">License</h3>
                            <p className="text-sm text-gray-600">
                              We grant you limited, non-exclusive access to use our platform for educational purposes
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-start gap-4 mb-6">
                    <Calendar className="h-8 w-8 text-olive-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Subscription & Payments</h2>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
                          <h3 className="font-bold text-gray-900 mb-3">Payment Terms</h3>
                          <div className="space-y-3">
                            <p className="text-gray-700">
                              • All subscription fees are in Indian Rupees (₹)
                            </p>
                            <p className="text-gray-700">
                              • Payments are non-refundable except as required by law
                            </p>
                            <p className="text-gray-700">
                              • We offer a 7-day free trial for new users
                            </p>
                            <p className="text-gray-700">
                              • Automatic renewal unless cancelled before billing cycle
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                    <p className="text-gray-700 mb-3">
                      Puddle provides educational content and tools, but we do not guarantee specific academic results. We are not liable for:
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-700">• Academic performance of users</p>
                      <p className="text-gray-700">• Technical issues beyond our control</p>
                      <p className="text-gray-700">• Third-party content or links</p>
                      <p className="text-gray-700">• Indirect or consequential damages</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
                  <p className="text-gray-700 mb-4">
                    We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
                  <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-xl p-6 border border-olive-200">
                    <p className="text-gray-700">
                      These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
                  <p className="text-gray-700">
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of our services after changes constitutes acceptance of new terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                  <div className="bg-white border border-olive-100 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      For questions about these Terms of Service, please contact:
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Email:</strong> legal@puddle.com
                      </p>
                      <p className="text-gray-700">
                        <strong>Phone:</strong> +91-1800-123-4567
                      </p>
                      <p className="text-gray-700">
                        <strong>Address:</strong> 123 Education Street, Knowledge City, Delhi 110001
                      </p>
                    </div>
                  </div>
                </section>
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
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white font-semibold">Terms of Service</Link></li>
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