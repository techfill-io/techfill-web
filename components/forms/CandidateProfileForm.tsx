'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { TechStackSelector } from '@/components/forms/TechStackSelector';
import { candidateProfileFormSchema, type CandidateProfileForm } from '@/lib/validations/candidate-profile';
import { 
  SENIORITY_LEVELS, 
  EMPLOYMENT_PREFERENCES, 
  REMOTE_PREFERENCES 
} from '@/lib/utils/constants';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CandidateProfileFormProps {
  initialData?: Partial<CandidateProfileForm>;
}

export function CandidateProfileForm({ initialData }: CandidateProfileFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CandidateProfileForm>({
    resolver: zodResolver(candidateProfileFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialData?.name || user?.user_metadata?.name || '',
      location: initialData?.location || '',
      headline: initialData?.headline || '',
      seniority: initialData?.seniority || undefined,
      tech_stack: initialData?.tech_stack || [],
      employment_preference: initialData?.employment_preference || '',
      remote_preference: initialData?.remote_preference || undefined,
      cv_url: initialData?.cv_url || '',
      is_visible: initialData?.is_visible || false,
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
  const watchedTechStack = watch('tech_stack');

  const onSubmit = async (data: CandidateProfileForm) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      console.log('Submitting profile data:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to profile page
      router.push('/dashboard/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/profile">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Profile</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600">Update your professional information</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              {...register('name')}
              label="Full Name"
              error={errors.name?.message}
              placeholder="Enter your full name"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
                {user?.email}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Email cannot be changed here. Contact support if needed.
              </p>
            </div>

            <Input
              {...register('location')}
              label="Location"
              error={errors.location?.message}
              placeholder="e.g., San Francisco, CA"
              helperText="City, State/Country"
            />

            <Input
              {...register('headline')}
              label="Professional Headline"
              error={errors.headline?.message}
              placeholder="e.g., Senior Full Stack Developer"
              helperText="A brief description of your role and expertise"
            />
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Professional Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              {...register('seniority')}
              label="Seniority Level"
              placeholder="Select your seniority level"
              options={[...SENIORITY_LEVELS]}
              error={errors.seniority?.message}
            />

            <TechStackSelector
              selectedTech={watchedTechStack}
              onChange={(techStack) => setValue('tech_stack', techStack)}
            />

            <Input
              {...register('employment_preference')}
              label="Employment Preference"
              placeholder="e.g., Full-time, Contract, Part-time"
              error={errors.employment_preference?.message}
              helperText="What type of employment are you seeking?"
            />

            <Select
              {...register('remote_preference')}
              label="Remote Work Preference"
              placeholder="Select your remote work preference"
              options={[...REMOTE_PREFERENCES]}
              error={errors.remote_preference?.message}
            />
          </CardContent>
        </Card>

        {/* CV Upload Section */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Resume/CV</h2>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">CV upload functionality coming soon</p>
              <Input
                {...register('cv_url')}
                label="CV URL (temporary)"
                placeholder="Paste your CV URL here"
                error={errors.cv_url?.message}
                helperText="For now, you can paste a link to your CV (Google Drive, etc.)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Visibility */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Profile Visibility</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('is_visible')}
                id="is_visible"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div>
                <label htmlFor="is_visible" className="text-sm font-medium text-gray-700">
                  Make profile visible to companies
                </label>
                <p className="text-sm text-gray-600">
                  When enabled, companies can view and contact you
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/dashboard/profile">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            isLoading={isSubmitting}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </Button>
        </div>
      </form>
    </div>
  );
}