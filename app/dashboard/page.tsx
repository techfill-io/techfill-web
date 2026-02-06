'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Settings, FileText, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, profile, isLoading } = useAuth();

  // Show loading state while profile is being fetched
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Get user role from profile data, fallback to candidate for safety
  const userRole = profile?.role || 'candidate';

  if (userRole === 'candidate') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Manage your profile and track your applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Profile</h3>
                  <p className="text-sm text-gray-600">Complete your profile</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completeness</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <Link href="/dashboard/profile/edit">
                  <Button size="sm" className="w-full mt-2">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <EyeOff className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visibility</h3>
                  <p className="text-sm text-gray-600">Hidden from companies</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Complete your profile to make it visible to companies
              </p>
              <Button variant="outline" size="sm" className="w-full" disabled>
                Make Profile Visible
              </Button>
            </CardContent>
          </Card>

          {/* Applications Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Applications</h3>
                  <p className="text-sm text-gray-600">Track your progress</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">In Review</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <Link href="/dashboard/applications">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/dashboard/profile/edit" className="block">
                <Button variant="outline" className="w-full flex items-center justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/dashboard/profile" className="block">
                <Button variant="outline" className="w-full flex items-center justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Company dashboard
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
        <p className="text-gray-600">Manage your company profile and job postings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Company Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Company Profile</h3>
                <p className="text-sm text-gray-600 ">Setup your company</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completeness</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <Link href="/dashboard/profile/edit">
                <Button size="sm" className="w-full mt-3">
                  Setup Company
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Job Postings Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Job Postings</h3>
                <p className="text-sm text-gray-600">Manage open positions</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Jobs</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Applications</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Post Job
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Candidates</h3>
                <p className="text-sm text-gray-600">Browse talent</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Interested</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Shortlisted</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <Link href="/dashboard/candidates">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Browse Candidates
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/profile/edit" className="block">
              <Button variant="outline" className="w-full flex items-center justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Edit Company Profile
              </Button>
            </Link>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Create Job Posting
            </Button>
            <Link href="/dashboard/candidates" className="block">
              <Button variant="outline" className="w-full flex items-center justify-start">
                <User className="h-4 w-4 mr-2" />
                Search Candidates
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}