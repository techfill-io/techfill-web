'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-gray-900">500</p>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
