// components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import {
  Menu,
  X,
  Sparkles,
  Home,
  DollarSign,
  FileText,
  Shield,
  Info,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/pricing" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Pricing
            </Link>
            <Link href="/terms" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" /> Terms
            </Link>
            <Link href="/privacy" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" /> Privacy
            </Link>
            <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-2">
              <Info className="h-4 w-4" /> About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:inline-flex items-center gap-2 text-olive-700 hover:text-olive-900 font-medium">
              <LogIn className="h-4 w-4" /> Login / Sign Up
            </Link>
			{/*
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:from-olive-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
			*/}
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
              <Link href="/pricing" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <DollarSign className="h-5 w-5" /> Pricing
              </Link>
              <Link href="/terms" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <FileText className="h-5 w-5" /> Terms
              </Link>
              <Link href="/privacy" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <Shield className="h-5 w-5" /> Privacy
              </Link>
              <Link href="/about" className="text-olive-700 hover:text-olive-900 font-medium flex items-center gap-3 px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                <Info className="h-5 w-5" /> About
              </Link>

              <div className="pt-4 border-t border-olive-200 px-4">
                <Link href="/login" className="block w-full text-center bg-olive-500 text-white py-3 rounded-lg font-medium hover:bg-olive-600 transition-colors mb-3" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="block w-full text-center border-2 border-olive-500 text-olive-600 py-3 rounded-lg font-medium hover:bg-olive-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}