'use client';

import { CandidateProfileForm } from '@/components/forms/CandidateProfileForm';
import { useAuth } from '@/contexts/auth-context';

export default function EditProfilePage() {
  const { user, profile } = useAuth();
  
  const userRole = profile?.role || 'candidate';

  if (userRole === 'candidate') {
    // Mock initial data - will be replaced with API call
    const mockInitialData = {
      name: user?.user_metadata?.name || user?.email?.split('@')[0] || '',
      location: '',
      headline: '',
      tech_stack: [],
      employment_preference: '',
      cv_url: '',
      is_visible: false,
    };

    return (
      <CandidateProfileForm initialData={mockInitialData} />
    );
  }

  // Company profile edit - placeholder for now
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Company Profile</h1>
          <p className="text-gray-600 mt-2">Update your company information to attract top talent</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Company Profile Editor Coming Soon
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>The company profile editor is currently in development. For now, you can manage basic settings from your dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}