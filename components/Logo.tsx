// components/Logo.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Logo() {
  const pathname = usePathname();
  
  // Determine the dashboard path based on current route
  const getDashboardPath = () => {
    if (pathname.includes('/parent-dashboard')) {
      return '/parent-dashboard';
    }
    return '/student-dashboard';
  };

  return (
    <Link 
      href={getDashboardPath()} 
      className="text-xl font-bold text-olive-800 hover:text-olive-700 transition-colors"
    >
      Puddle
    </Link>
  );
}