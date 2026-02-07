import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-gray-900">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/jobs"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
