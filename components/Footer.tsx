// components/Footer.tsx
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-olive-800 to-emerald-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
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
              Empowering school students (Grades 6–12) to excel in their curriculum with personalised learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-emerald-200">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-emerald-200">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Join As */}
          <div>
            <h4 className="font-bold mb-4">Join As</h4>
            <ul className="space-y-2 text-emerald-200">
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
              <li><Link href="/register" className="hover:text-white">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-300 text-sm">
          © {new Date().getFullYear()} Puddle – All rights reserved.
        </div>
      </div>
    </footer>
  );
}