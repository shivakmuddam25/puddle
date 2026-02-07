// app/about/page.tsx
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle, 
  Target, 
  Users, 
  Calendar, 
  Lightbulb, 
  ArrowRight, 
  BookOpen, 
  Video, 
  Award, 
  Globe,
  Home,
  GraduationCap,
  FileText,
  DollarSign,
  User,
  LogIn,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import { useState } from 'react';
import founderPhoto from './founder-photo.jpeg';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const founder = {
    name: "Shiva Kumar Muddam",
    title: "Founder & CEO",
    bio: "With dual Master's degrees in Computer Science and Information Technology Management from the USA, Shiva brings over a decade of experience in tech education and content creation. His passion for simplifying complex concepts has helped thousands of students master challenging topics.",
    education: "Masters in Computer Science, USA | Masters in Information Technology and Management, USA",
    philosophy: "Quality education should be accessible, engaging, and practical. Through meticulously crafted content and clear explanations, we empower students to not just learn, but truly understand.",
    photoUrl: founderPhoto // Replace with actual image path
  };

  const contentValues = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Quality Content",
      description: "Every lesson is meticulously researched, structured, and reviewed to ensure accuracy and educational value."
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Engaging Videos",
      description: "High-quality video production with clear explanations, visual aids, and practical examples that make learning intuitive."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Concept Mastery",
      description: "We focus on deep understanding rather than rote memorization, building strong foundational knowledge."
    }
  ];

  const futurePlans = [
    {
      year: "2024",
      title: "Content Expansion",
      milestones: ["Launch advanced AI/ML courses", "Add 500+ new practice problems", "Introduce interactive coding exercises"]
    },
    {
      year: "2025",
      title: "Global Reach",
      milestones: ["Translate content to 5+ languages", "Partner with international universities", "Reach 100,000+ active learners"]
    },
    {
      year: "2026",
      title: "Learning Platform",
      milestones: ["Launch personalized learning paths", "Introduce AI-driven recommendations", "Build student community platform"]
    }
  ];

  const achievements = [
    { number: "10K+", label: "Students Empowered" },
    { number: "500+", label: "Hours of Content" },
    { number: "98%", label: "Student Satisfaction" },
    { number: "4.9/5", label: "Average Rating" }
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
                <Home className="h-8 w-8 text-olive-700" />
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
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-olive-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container relative mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Puddle</h1>
            <p className="text-xl md:text-2xl text-olive-100 mb-8">
              Discover our mission, meet our founder, and learn how we're transforming competitive exam preparation.
            </p>
            <a href="#founder" className="inline-flex items-center bg-white text-olive-900 font-semibold px-6 py-3 rounded-lg hover:bg-olive-50 transition duration-300">
              Meet Our Founder <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-olive-100 text-center hover:shadow-md transition duration-300">
              <div className="text-3xl md:text-4xl font-bold text-olive-700 mb-2">{achievement.number}</div>
              <div className="text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Founder Section */}
        <section id="founder" className="mb-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
			  <div className="bg-gradient-to-br from-olive-100 to-olive-50 rounded-2xl p-2 shadow-lg border border-olive-200">
				<div className="relative h-96 w-full rounded-xl overflow-hidden">
				  <Image
					src={founder.photoUrl}
					alt={founder.name}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 33vw"
					priority
				  />
				</div>
				<div className="p-6">
				  <h3 className="text-2xl font-bold text-gray-900">{founder.name}</h3>
				  <p className="text-olive-700 font-semibold mb-3">{founder.title}</p>
				  <div className="space-y-3 text-sm text-gray-600">
					<div className="flex items-start">
					  <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-olive-600 flex-shrink-0" />
					  <span>{founder.education}</span>
					</div>
					<div className="flex items-start">
					  <Award className="h-4 w-4 mr-2 mt-0.5 text-olive-600 flex-shrink-0" />
					  <span>World Green Economy Organization (WGEO), UAE Affiliate</span>
					</div>
				  </div>
				</div>
			  </div>
			</div>

            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Educational Philosophy</h2>
              <div className="prose prose-lg text-gray-700 mb-8">
                <p className="text-lg leading-relaxed mb-6">
                  {founder.bio}
                </p>
                <blockquote className="border-l-4 border-olive-500 pl-6 py-2 my-8 italic text-gray-800 bg-olive-50/50 rounded-r-lg">
                  "Quality content paired with quality videos makes complex concepts understandable. We believe in empowering students with clarity, not just information."
                </blockquote>
                <p className="text-lg leading-relaxed">
                  {founder.philosophy}
                </p>
              </div>

              {/* Content Values */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Content Promise</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {contentValues.map((value, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-olive-300 hover:shadow-md transition duration-300 group">
                      <div className="text-olive-600 mb-4 group-hover:scale-110 transition duration-300">{value.icon}</div>
                      <h4 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WGEO Affiliation */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 border border-olive-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-olive-500 to-emerald-600 flex items-center justify-center">
                  <Globe className="h-20 w-20 text-white" />
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-olive-100 text-olive-800 font-semibold mb-4">
                  <Award className="h-4 w-4 mr-2" />
                  Official Affiliation
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Recognized by World Green Economy Organization (WGEO)
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We're proud to be an affiliate of the World Green Economy Organization, aligning our educational mission with sustainable development goals. This recognition underscores our commitment to creating educational content that supports a greener, more sustainable future through technology education.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white/80 p-4 rounded-lg border border-olive-100">
                    <div className="text-olive-700 font-bold">Sustainable</div>
                    <div className="text-sm text-gray-600">Education Approach</div>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg border border-olive-100">
                    <div className="text-olive-700 font-bold">Global</div>
                    <div className="text-sm text-gray-600">Standards</div>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg border border-olive-100">
                    <div className="text-olive-700 font-bold">Verified</div>
                    <div className="text-sm text-gray-600">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-olive-50/70 to-white p-8 rounded-2xl shadow-sm border border-olive-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-olive-100 text-olive-700 mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To democratize quality technical education through meticulously crafted content and engaging video lessons that make complex concepts accessible to every learner.
              </p>
              <ul className="mt-6 space-y-3">
                {["Create 1000+ hours of premium educational content", "Help 50,000+ students achieve their learning goals", "Maintain 95%+ student satisfaction rate", "Continuously update content with latest technologies"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-olive-600 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50/70 to-white p-8 rounded-2xl shadow-sm border border-emerald-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mb-6">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                A world where quality technical education is not a privilege but a right accessible to all, regardless of background or location.
              </p>
              <div className="mt-8 p-6 bg-white/80 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-lg text-gray-900 mb-3">The Learning Experience We Provide</h4>
                <p className="text-gray-700">
                  Clear explanations, practical examples, and engaging visuals that transform complex topics into understandable concepts, building confidence and competence in our students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Plans Roadmap */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Growth Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic plans to expand our educational impact and reach more learners worldwide
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-olive-400 to-emerald-600"></div>

            <div className="space-y-12">
              {futurePlans.map((plan, index) => (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className="md:w-1/2 md:px-10 mb-6 md:mb-0">
                    <div className={`bg-white p-8 rounded-2xl shadow-md border border-olive-100 hover:shadow-lg transition duration-300 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-olive-100 text-olive-800 font-semibold mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        {plan.year}
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">{plan.title}</h4>
                      <ul className={`space-y-3 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                        {plan.milestones.map((milestone, mIndex) => (
                          <li key={mIndex} className="flex items-start">
                            {index % 2 === 0 && <ArrowRight className="h-5 w-5 text-olive-600 mr-3 flex-shrink-0" />}
                            <span className="text-gray-700">{milestone}</span>
                            {index % 2 !== 0 && <ArrowRight className="h-5 w-5 text-olive-600 ml-3 transform rotate-180 flex-shrink-0" />}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center md:justify-center">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-olive-600 border-4 border-white shadow-lg"></div>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:px-10"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Navigation Back to Main Sections */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 border border-olive-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ready to Start Learning?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/exams" 
                className="bg-white p-6 rounded-xl border border-olive-200 hover:border-olive-400 hover:shadow-md transition duration-300 text-center"
              >
                <GraduationCap className="h-8 w-8 text-olive-600 mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Explore Exams</h4>
                <p className="text-sm text-gray-600">Browse all available exam preparations</p>
              </Link>
              
              <Link 
                href="/tests" 
                className="bg-white p-6 rounded-xl border border-olive-200 hover:border-olive-400 hover:shadow-md transition duration-300 text-center"
              >
                <FileText className="h-8 w-8 text-olive-600 mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Take Mock Tests</h4>
                <p className="text-sm text-gray-600">Practice with AI-powered tests</p>
              </Link>
              
              <Link 
                href="/" 
                className="bg-gradient-to-r from-olive-100 to-emerald-100 p-6 rounded-xl border border-olive-300 hover:border-olive-500 hover:shadow-md transition duration-300 text-center"
              >
                <Home className="h-8 w-8 text-olive-700 mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Return to Home</h4>
                <p className="text-sm text-gray-600">Back to main dashboard</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-olive-800 to-olive-900 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-olive-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-olive-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Join Our Learning Community</h3>
            <p className="text-xl text-olive-100 max-w-3xl mx-auto mb-8">
              Whether you're a student seeking clarity, an educator looking to collaborate, or an organization interested in partnerships, we invite you to connect with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-olive-900 font-semibold px-8 py-3 rounded-lg hover:bg-olive-50 transition duration-300 shadow-md hover:shadow-lg">
                Start Free Trial
              </Link>
              <Link href="/" className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition duration-300">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Consistent with Home Page */}
      <footer className="bg-gradient-to-r from-olive-800 to-emerald-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Home className="h-8 w-8 text-emerald-300" />
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
                <li><Link href="/about" className="hover:text-white font-semibold">About Us</Link></li>
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