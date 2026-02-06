'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/Button';
import { User, Settings, LogOut, FileText, Building2, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut, profile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  // Get role from profile data (from backend API)
  const userRole = profile?.role || 'candidate';

  const navigation = [
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: User,
      active: pathname.startsWith('/dashboard/profile'),
    },
    ...(userRole === 'candidate' ? [
      {
        name: 'Applications',
        href: '/dashboard/applications',
        icon: FileText,
        active: pathname.startsWith('/dashboard/applications'),
      }
    ] : []),
    ...(userRole === 'company' ? [
      {
        name: 'Jobs',
        href: '/dashboard/jobs',
        icon: Building2,
        active: pathname.startsWith('/dashboard/jobs'),
      },
      {
        name: 'Candidates',
        href: '/dashboard/candidates',
        icon: Users,
        active: pathname.startsWith('/dashboard/candidates'),
      }
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">TechFill</h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user?.email}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                      ${item.active 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}