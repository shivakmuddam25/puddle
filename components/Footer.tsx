// components/Footer.tsx
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-olive-800 to-emerald-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-olive-500 to-emerald-600 p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif">Puddle</h3>
                <p className="text-emerald-200 text-sm">Where curiosity makes ripples</p>
              </div>
            </div>
            <p className="text-emerald-200 text-sm mt-2">
              Empowering learners at every stage - from school to success.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Learning Levels</h4>
            <ul className="space-y-2 text-emerald-200">
              <li><Link href="/k12" className="hover:text-white">6-10, K-12 (Intermediate) School</Link></li>
              <li><Link href="/college" className="hover:text-white">College Programs</Link></li>
              <li><Link href="/competitive" className="hover:text-white">Competitive Exams</Link></li>
              <li><Link href="/professional" className="hover:text-white">Professional Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-emerald-200">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/tests" className="hover:text-white">Mock Tests</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Join As</h4>
            <ul className="space-y-2 text-emerald-200">
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
              <li><Link href="/register" className="hover:text-white">Register</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-300 text-sm">
          © {new Date().getFullYear()} Puddle - All rights reserved.
        </div>
      </div>
    </footer>
  );
}