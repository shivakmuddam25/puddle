// app/privacy/page.tsx
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
  Lock,
  Eye,
  Globe,
  Calendar,
  Mail,
  Phone,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
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
              <Shield className="h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
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
              <p className="text-gray-700 mb-8">
                At Puddle, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <strong>Personal Information:</strong> Name, email address, phone number, date of birth, and grade/class information
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <strong>Academic Information:</strong> Exam preferences, study patterns, performance data, and learning progress
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <strong>Technical Information:</strong> IP address, device information, browser type, and usage patterns
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-olive-50 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Educational Purposes</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Personalized learning experiences</li>
                        <li>• Progress tracking and analytics</li>
                        <li>• Adaptive test recommendations</li>
                        <li>• Study plan customization</li>
                      </ul>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Platform Improvement</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Service enhancement</li>
                        <li>• Security monitoring</li>
                        <li>• Customer support</li>
                        <li>• Legal compliance</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
                  <div className="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                    <Lock className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 mb-3">
                        We implement industry-standard security measures including:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">End-to-end encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Regular security audits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">GDPR compliance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Data retention policies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        With your explicit consent for specific purposes
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        With educational institutions as required for academic purposes
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        To comply with legal obligations or protect rights and safety
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Children's Privacy</h2>
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                    <p className="text-gray-700">
                      Puddle is designed for students of all ages, including K-12 students. We comply with COPPA (Children's Online Privacy Protection Act) and other applicable regulations. For students under 13, we require parental consent before collecting any personal information.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                  <p className="text-gray-700 mb-4">
                    You have the right to:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-olive-100 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Access & Control</h3>
                      <p className="text-sm text-gray-600">Access, update, or delete your personal information</p>
                    </div>
                    <div className="bg-white border border-olive-100 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Data Portability</h3>
                      <p className="text-sm text-gray-600">Request a copy of your data in a readable format</p>
                    </div>
                    <div className="bg-white border border-olive-100 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Opt-out</h3>
                      <p className="text-sm text-gray-600">Opt-out of marketing communications</p>
                    </div>
                    <div className="bg-white border border-olive-100 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Complaints</h3>
                      <p className="text-sm text-gray-600">Lodge complaints with regulatory authorities</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
                  <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-xl p-6 border border-olive-200">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-olive-600" />
                        <span className="text-gray-700">privacy@puddle.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-olive-600" />
                        <span className="text-gray-700">+91-1800-123-4567</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-olive-600" />
                        <span className="text-gray-700">123 Education Street, Knowledge City, Delhi 110001</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Policy Updates</h2>
                  <p className="text-gray-700">
                    We may update this Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy regularly.
                  </p>
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
                <li><Link href="/privacy" className="hover:text-white font-semibold">Privacy Policy</Link></li>
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