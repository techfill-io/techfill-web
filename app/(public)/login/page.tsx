'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { ZodError } from 'zod';

function LoginForm() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const reset = searchParams.get('reset');
    const verified = searchParams.get('verified');
    const error = searchParams.get('error');

    if (reset === 'success') {
      setSuccessMessage('Your password has been reset successfully. Please log in with your new password.');
    } else if (verified === 'true') {
      setSuccessMessage('Your email has been verified. You can now log in.');
    }

    if (error === 'auth_failed') {
      setGeneralError('Authentication failed. Please try again.');
    } else if (error === 'verification_failed') {
      setGeneralError('Email verification failed. The link may have expired.');
    }
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);
    setIsLoading(true);

    try {
      const validated = loginSchema.parse(formData);

      const { error } = await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password,
      });

      if (error) {
        if (error.message?.includes('Email not confirmed')) {
          setGeneralError('Please verify your email address before logging in.');
        } else {
          setGeneralError('Invalid email or password.');
        }
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          const field = e.path[0]?.toString();
          if (field) {
            fieldErrors[field] = e.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">Log in to TechFill</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup/candidate" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up as a candidate
            </Link>
            {' '}or{' '}
            <Link href="/signup/company" className="font-medium text-blue-600 hover:text-blue-500">
              as a company
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <GoogleSignInButton mode="signin" />
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        {generalError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{generalError}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
