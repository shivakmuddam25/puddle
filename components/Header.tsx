// components/Header.tsx
"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Sparkles,
  Home,
  GraduationCap,
  FileText,
  DollarSign,
  LogIn,
  UserPlus,
  School,
  ChevronDown,
  BookMarked,
  Target,
  HelpCircle
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStudyLevels, setShowStudyLevels] = useState(false);
  const studyLevelsDropdownRef = useRef<HTMLDivElement>(null);
  const studyLevelsButtonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside for study levels dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showStudyLevels &&
        studyLevelsDropdownRef.current &&
        !studyLevelsDropdownRef.current.contains(event.target as Node) &&
        studyLevelsButtonRef.current &&
        !studyLevelsButtonRef.current.contains(event.target as Node)
      ) {
        setShowStudyLevels(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStudyLevels]);

  return (
    <nav className="sticky top-0 z-50 bg-olive-50/90 backdrop-blur-md border-b border-olive-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-olive-400 to-emerald-400 rounded-full blur opacity-30"></div>
              <div className="relative bg-gradient-to-br from-olive-500 to-emerald-600 p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-olive-800 font-serif tracking-tight">Puddle</span>
              <span className="text-xs text-olive-600 italic -mt-1">Where curiosity makes ripples</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Link>

            {/* Study Levels Dropdown */}
            <div className="relative">
              <button
                ref={studyLevelsButtonRef}
                onMouseEnter={() => setShowStudyLevels(true)}
                onMouseLeave={() => setShowStudyLevels(false)}
                onClick={() => setShowStudyLevels(!showStudyLevels)}
                className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2"
              >
                <School className="h-4 w-4" />
                Study Levels
                <ChevronDown className="h-4 w-4" />
              </button>

              {showStudyLevels && (
                <div
                  ref={studyLevelsDropdownRef}
                  onMouseEnter={() => setShowStudyLevels(true)}
                  onMouseLeave={() => setShowStudyLevels(false)}
                  className="absolute w-64 bg-white shadow-xl rounded-lg border border-olive-100 mt-2 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-olive-100 bg-olive-50">
                    <div className="text-sm font-bold text-olive-800">Choose Your Learning Path</div>
                  </div>
                  <Link
                    href="/k12"
                    className="flex items-center gap-3 px-4 py-4 hover:bg-olive-50 text-gray-700 transition-colors group"
                    onClick={() => setShowStudyLevels(false)}
                  >
                    <div className="p-2 bg-olive-100 rounded-lg group-hover:bg-olive-200 transition-colors">
                      <BookMarked className="h-5 w-5 text-olive-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">6-10, K-12 (Intermediate) Students</div>
                      <div className="text-xs text-gray-500">School curriculum for Grades 1-12</div>
                    </div>
                  </Link>
                  <Link
                    href="/college"
                    className="flex items-center gap-3 px-4 py-4 hover:bg-emerald-50 text-gray-700 transition-colors group"
                    onClick={() => setShowStudyLevels(false)}
                  >
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <School className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">College Students</div>
                      <div className="text-xs text-gray-500">Degree programs and courses</div>
                    </div>
                  </Link>
                  <Link
                    href="/competitive"
                    className="flex items-center gap-3 px-4 py-4 hover:bg-amber-50 text-gray-700 transition-colors group"
                    onClick={() => setShowStudyLevels(false)}
                  >
                    <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Competitive Exams</div>
                      <div className="text-xs text-gray-500">JEE, NEET, UPSC, and more</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/exams" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Exams
            </Link>
            <Link href="/tests" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" /> Mock Tests
            </Link>
            <Link href="/pricing" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Pricing
            </Link>
            <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <HelpCircle className="h-4 w-4" /> About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:inline-flex items-center gap-2 text-olive-700 hover:text-olive-900 font-medium">
              <LogIn className="h-4 w-4" /> Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:from-olive-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Start Free Trial
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-olive-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-olive-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <Home className="h-5 w-5" /> Home
              </Link>

              <div className="px-4">
                <div className="text-sm font-medium text-olive-700 mb-2">Study Levels:</div>
                <div className="space-y-2 pl-4">
                  <Link href="/k12" className="text-olive-600 hover:text-olive-900 font-medium flex items-center gap-3 py-2" onClick={() => setIsMenuOpen(false)}>
                    <BookMarked className="h-4 w-4" /> 6-10, K-12 (Intermediate) Students
                  </Link>
                  <Link href="/college" className="text-olive-600 hover:text-olive-900 font-medium flex items-center gap-3 py-2" onClick={() => setIsMenuOpen(false)}>
                    <School className="h-4 w-4" /> College Students
                  </Link>
                  <Link href="/competitive" className="text-olive-600 hover:text-olive-900 font-medium flex items-center gap-3 py-2" onClick={() => setIsMenuOpen(false)}>
                    <Target className="h-4 w-4" /> Competitive Exams
                  </Link>
                </div>
              </div>

              <Link href="/exams" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <GraduationCap className="h-5 w-5" /> Exams
              </Link>
              <Link href="/tests" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <FileText className="h-5 w-5" /> Mock Tests
              </Link>
              <Link href="/pricing" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <DollarSign className="h-5 w-5" /> Pricing
              </Link>
              <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <HelpCircle className="h-5 w-5" /> About
              </Link>

              <div className="pt-4 border-t border-olive-200 px-4">
                <Link href="/login" className="block w-full text-center bg-olive-500 text-white py-3 rounded-lg font-medium hover:bg-olive-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}