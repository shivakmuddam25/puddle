// components/AccessModal.tsx
import { useState } from 'react';
import { Shield, Calendar, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll: () => void;
  gradeLevel: number;
  isLoading: boolean;
}

export default function AccessModal({ isOpen, onClose, onEnroll, gradeLevel, isLoading }: AccessModalProps) {
  if (!isOpen) return null;

  const now = new Date();
  const currentYear = now.getFullYear();
  const dec31 = new Date(currentYear, 11, 31);
  const isFreeTrialAvailable = now <= dec31;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="text-center mb-6">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">Access Required</h2>
          <p className="text-gray-600 mt-2">
            You need to enroll in Grade {gradeLevel} courses
          </p>
        </div>

        {isFreeTrialAvailable && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Free Trial Available</h3>
                <p className="text-sm text-green-700 mt-1">
                  Start your 14-day free trial today! No credit card required.
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Offer valid until December 31st, {currentYear}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Full access to all subjects for Grade {gradeLevel}</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Interactive video lessons and quizzes</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Progress tracking and performance analytics</span>
          </div>
        </div>

        <div className="space-y-3">
          {isFreeTrialAvailable && (
            <button
              onClick={onEnroll}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 font-medium"
            >
              {isLoading ? 'Processing...' : 'Start 14-Day Free Trial'}
            </button>
          )}
          
          <button
            onClick={() => window.location.href = '/pricing'}
            className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
          >
            <CreditCard className="inline-block mr-2 h-4 w-4" />
            View Subscription Plans
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 hover:text-gray-700 text-sm"
          >
            Close
          </button>
        </div>

        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-gray-500">
            Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}