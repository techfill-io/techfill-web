'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

const navLinks = [
  { href: '/jobs', label: 'Find jobs' },
  { href: '/startups', label: 'Browse startups' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/for-startups', label: 'For startups' },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const fullName = user?.user_metadata?.full_name as string | undefined;
  const initials = fullName
    ? fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              TechFill
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium ${
                    pathname === href
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated ? (
              <Link
                href="/dashboard/profile"
                className="flex items-center space-x-2 group"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName ?? 'Profile'}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-300 transition-all"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-medium ring-2 ring-transparent group-hover:ring-blue-300 transition-all">
                    {initials}
                  </span>
                )}
                <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {fullName ?? user?.email}
                </span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Log in
                </Link>
                <Link href="/signup/candidate" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
