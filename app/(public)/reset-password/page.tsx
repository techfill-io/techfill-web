'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';

export default function ResetPasswordPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    // Supabase sends the token in the URL hash for password recovery
    // The hash format is: #access_token=...&type=recovery&...
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');

    if (accessToken && type === 'recovery') {
      // Set the session with the recovery token
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: hashParams.get('refresh_token') || '',
      }).then(({ error }: { error: Error | null }) => {
        if (error) {
          setIsValidToken(false);
          setGeneralError('Invalid or expired reset link. Please request a new one.');
        } else {
          setIsValidToken(true);
        }
      });
    } else {
      // Check if we already have a valid recovery session
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: unknown } }) => {
        if (session) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          setGeneralError('Invalid or expired reset link. Please request a new one.');
        }
      });
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      resetPasswordSchema.parse(formData);

      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        setGeneralError(error.message);
        setIsLoading(false);
        return;
      }

      // Sign out after password reset to force re-login with new password
      await supabase.auth.signOut();

      // Redirect to login with success message
      router.push('/login?reset=success');
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

  const passwordStrength = getPasswordStrength(formData.password);

  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (isValidToken === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Link expired</h2>
          <p className="text-gray-600 mb-6">{generalError}</p>
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500 font-medium">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">Set new password</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        {generalError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{generalError}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                          passwordStrength >= level
                            ? level <= 1
                              ? 'bg-red-500'
                              : level <= 2
                                ? 'bg-yellow-500'
                                : level <= 3
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {passwordStrength <= 1 && 'Weak'}
                    {passwordStrength === 2 && 'Fair'}
                    {passwordStrength === 3 && 'Good'}
                    {passwordStrength >= 4 && 'Strong'}
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating password...' : 'Update password'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
            &larr; Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

function getPasswordStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}
