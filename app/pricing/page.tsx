// app/pricing/page.tsx
"use client"

import Link from 'next/link';
import { 
  CheckCircle, 
  ArrowRight, 
  Home,
  GraduationCap,
  FileText,
  DollarSign,
  User,
  LogIn,
  Menu,
  X,
  ChevronLeft,
  Star,
  Users,
  Clock,
  Trophy,
  HelpCircle,
  Zap,
  Shield,
  Globe,
  BookOpen,
  Brain,
  Target,
  BarChart3,
  Sparkles,
  Crown,
  BadgeCheck
} from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: "Starter",
      price: { monthly: "₹499", yearly: "₹4,999" },
      period: { monthly: "/month", yearly: "/year" },
      description: "Perfect for casual learners",
      features: [
        "20 Mock Tests per month",
        "Basic Performance Analytics",
        "Community Support",
        "Limited Question Bank",
        "Daily Practice Questions"
      ],
      cta: "Get Started",
      popular: false,
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      name: "Pro",
      price: { monthly: "₹999", yearly: "₹9,999" },
      period: { monthly: "/month", yearly: "/year" },
      description: "Most popular for serious aspirants",
      features: [
        "Unlimited Mock Tests",
        "Advanced AI Analytics",
        "Priority Support",
        "Full Question Bank Access",
        "All-India Ranking",
        "Performance Reports",
        "Personalized Study Plans"
      ],
      cta: "Buy Now",
      popular: true,
      icon: <Brain className="h-6 w-6" />
    },
    {
      name: "Premium",
      price: { monthly: "₹1,999", yearly: "₹19,999" },
      period: { monthly: "/month", yearly: "/year" },
      description: "Ultimate preparation package",
      features: [
        "Everything in Pro",
        "One-on-One Mentoring",
        "AI-Proctored Tests",
        "College Predictor",
        "Certificate of Excellence",
        "Doubt Clearing Sessions",
        "Custom Study Schedule",
        "Topper's Strategies"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: <Crown className="h-6 w-6" />
    }
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Tests",
      description: "Intelligent mock tests that adapt to your performance level"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real Analytics",
      description: "Comprehensive performance tracking with detailed insights"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Personalized Plans",
      description: "Custom study schedules based on your strengths and weaknesses"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Platform",
      description: "Bank-level security for all your data and payments"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "All-India Ranking",
      description: "Compare your performance with thousands of aspirants"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Certification",
      description: "Get certified performance reports for college applications"
    }
  ];

  const faqs = [
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. The changes will be prorated accordingly."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 7-day free trial for our Pro plan. No credit card required to start the trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, Net Banking, and PayPal for international payments."
    },
    {
      question: "Can I get a refund?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/50 to-white">
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
              <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                About
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
                <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2">
                  <HelpCircle className="h-5 w-5" />
                  About
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

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-olive-800 to-olive-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-olive-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-olive-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container relative mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl md:text-2xl text-olive-100 mb-8">
              Choose the perfect plan for your exam preparation journey. All plans include our core features.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Billing Toggle */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-xl p-2 border border-olive-200 inline-flex mx-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white shadow'
                  : 'text-gray-600 hover:text-olive-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white shadow'
                  : 'text-gray-600 hover:text-olive-700'
              }`}
            >
              Yearly <span className="text-xs font-normal ml-1">(Save 16%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-2xl border-2 ${
                plan.popular 
                  ? 'border-olive-500 shadow-2xl transform scale-105 relative z-10' 
                  : 'border-gray-200'
              } p-8 relative transition-all hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-olive-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8 pt-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-olive-100 text-olive-600 mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price[billingCycle]}</span>
                  <span className="text-gray-600">{plan.period[billingCycle]}</span>
                </div>
                <p className="text-gray-600 mt-3">{plan.description}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href={plan.popular ? "/register" : "/contact"}
                className={`w-full py-3 rounded-lg font-medium text-center transition-all block ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl' 
                    : 'border-2 border-olive-500 text-olive-600 hover:bg-olive-50'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to <span className="text-olive-600">Succeed</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl border border-olive-100 p-6 hover:shadow-md transition-shadow">
                <div className="inline-flex p-3 rounded-lg bg-olive-100 text-olive-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-olive-100 p-6 hover:border-olive-300 transition-colors">
                <h3 className="text-lg font-bold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 md:p-12 text-center border border-olive-200">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Our team is here to help you choose the right plan and answer any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-olive-500 to-emerald-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center border-2 border-olive-500 text-olive-600 font-semibold px-8 py-3 rounded-lg hover:bg-olive-50 transition-colors"
            >
              Back to Home
            </Link>
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
                <li><Link href="/pricing" className="hover:text-white font-semibold">Pricing</Link></li>
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