// components/UserProfile.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings, UserCircle, Mail, Calendar, ChevronRight } from 'lucide-react';

interface UserProfileProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userGrade?: string;
  userBoard?: string;
}

export default function UserProfile({ 
  userName = 'Student', 
  userEmail = '',
  userAvatar,
  userGrade,
  userBoard
}: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.removeItem('studentGrade');
    localStorage.removeItem('studentGradeLevel');
    localStorage.removeItem('studentBoard');
    localStorage.removeItem('studentBoardId');
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentName');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isParentAccess');
    localStorage.removeItem('authToken');
    
    router.push('/login');
  };

  const getInitials = () => {
    return userName.charAt(0).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none group"
      >
        <div className="relative">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 group-hover:border-olive-500 transition-colors"
            />
          ) : (
            <div className="w-9 h-9 bg-gradient-to-r from-olive-500 to-emerald-500 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <span className="text-white font-semibold text-sm">
                {getInitials()}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {userName}
        </span>
        <ChevronRight size={14} className={`hidden md:block text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-slide-down">
          {/* Profile Header */}
          <div className="p-4 bg-gradient-to-r from-olive-50 to-emerald-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-olive-500 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">
                    {getInitials()}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{userName}</h3>
                {userEmail && (
                  <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                )}
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="p-3 border-b border-gray-100">
            <div className="space-y-2">
              {(userGrade || userBoard) && (
                <div className="flex items-center gap-2 text-sm">
                  <UserCircle size={16} className="text-gray-400" />
                  <span className="text-gray-600">Student</span>
                  {userGrade && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      {userGrade}
                    </span>
                  )}
                  {userBoard && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      {userBoard}
                    </span>
                  )}
                </div>
              )}
              {userEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-600 truncate">{userEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}