'use client';

import { useAuth } from '@/contexts/auth-context';
import { SetPasswordCTA } from '@/components/auth/SetPasswordCTA';

export default function DashboardPage() {
  const { user, profile, isLoading, signOut, hasPassword } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">TechFill</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

          {/* Show Set Password CTA for Google-only users */}
          {!hasPassword && (
            <div className="mb-6">
              <SetPasswordCTA />
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Welcome back!</h3>

            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Email:</span>
                <p className="text-gray-900">{user?.email}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Role:</span>
                <p className="text-gray-900 capitalize">{profile?.role || 'Loading...'}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Auth Provider:</span>
                <p className="text-gray-900 capitalize">{profile?.auth_provider || 'Loading...'}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Has Password:</span>
                <p className="text-gray-900">{hasPassword ? 'Yes' : 'No'}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Profile Complete:</span>
                <p className="text-gray-900">{profile?.profile_complete ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
