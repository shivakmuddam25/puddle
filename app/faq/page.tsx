// app/contact/page.tsx
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
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Clock,
  Globe,
  Award,
  Users,
  Brain
} from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactDetails = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["support@puddle.com", "admissions@puddle.com"],
      description: "Response within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+91-1800-123-4567", "+91-98765-43210"],
      description: "Monday to Saturday, 9 AM - 6 PM"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office",
      details: ["123 Education Street", "Knowledge City, Delhi 110001"],
      description: "Visit by appointment"
    }
  ];

  const departments = [
    {
      name: "Admissions",
      email: "admissions@puddle.com",
      phone: "+91-1800-123-4567",
      description: "Course inquiries and enrollment"
    },
    {
      name: "Technical Support",
      email: "techsupport@puddle.com",
      phone: "+91-1800-123-4568",
      description: "Platform issues and technical queries"
    },
    {
      name: "Content Queries",
      email: "content@puddle.com",
      phone: "+91-1800-123-4569",
      description: "Study material and course content"
    },
    {
      name: "Billing",
      email: "billing@puddle.com",
      phone: "+91-1800-123-4570",
      description: "Payment and subscription queries"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-olive-100 mb-8">
              Have questions about our courses, exams, or platform? We're here to help you succeed.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl border border-olive-100 shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="admission">Admission Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="content">Content Query</option>
                    <option value="billing">Billing Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 border border-olive-200 rounded-lg focus:border-olive-500 focus:ring-2 focus:ring-olive-100 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 border border-olive-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <div key={detail.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border border-olive-200 flex items-center justify-center text-olive-600">
                        {detail.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{detail.title}</h3>
                      {detail.details.map((item, index) => (
                        <p key={index} className="text-gray-700">{item}</p>
                      ))}
                      <p className="text-sm text-gray-600 mt-2">{detail.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-2xl border border-olive-100 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact by Department</h2>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.name} className="p-4 border border-olive-100 rounded-lg hover:bg-olive-50 transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">{dept.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 text-olive-700">
                        <Mail className="h-4 w-4" />
                        <span>{dept.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-olive-700">
                        <Phone className="h-4 w-4" />
                        <span>{dept.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Help</h2>
              <div className="space-y-4">
                <Link href="/faq" className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors group">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      Check FAQ
                    </span>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/guides" className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors group">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      Study Guides
                    </span>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/blog" className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      Learning Tips
                    </span>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Response Time</h3>
                <p className="text-gray-700">
                  We strive to respond to all inquiries within 24 hours. For urgent matters, 
                  please call our support line. Our team is dedicated to helping students 
                  succeed in their academic journey.
                </p>
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
                <li><Link href="/contact" className="hover:text-white font-semibold">Contact Us</Link></li>
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