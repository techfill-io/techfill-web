'use client';

import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';

export default function OnboardingPage() {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to TechFill!</h2>
          <p className="mt-2 text-gray-600">
            Let&apos;s complete your profile to get started.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Role:</strong> {profile?.role || 'Unknown'}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            This is a placeholder onboarding page. In a full implementation, this would
            guide users through completing their profile based on their role (candidate or company).
          </p>

          <Link
            href="/dashboard"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
