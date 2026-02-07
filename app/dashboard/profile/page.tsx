'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, MapPin, Briefcase, Eye, EyeOff, Upload, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const userRole = profile?.role || 'candidate';

  // Mock candidate profile data - will be replaced with API call
  const candidateProfile = {
    name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'Your Name',
    email: user?.email || '',
    location: '',
    headline: '',
    seniority: '',
    tech_stack: [],
    employment_preference: '',
    remote_preference: '',
    cv_url: '',
    is_visible: false,
    completeness_score: 20, // Only name and email from signup
  };

  if (userRole === 'candidate') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your profile information</p>
          </div>
          <Link href="/dashboard/profile/edit">
            <Button className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                  <div className="flex items-center space-x-2">
                    {candidateProfile.is_visible ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Visible</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <EyeOff className="h-4 w-4" />
                        <span className="text-sm">Hidden</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{candidateProfile.name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{candidateProfile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-600">{candidateProfile.location || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Professional Headline</label>
                  <p className="text-gray-600">{candidateProfile.headline || 'Not provided'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Professional Details</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Seniority Level</label>
                  <p className="text-gray-600">{candidateProfile.seniority || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tech Stack</label>
                  {candidateProfile.tech_stack.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {candidateProfile.tech_stack.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No technologies specified</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Employment Preference</label>
                  <p className="text-gray-600">{candidateProfile.employment_preference || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Remote Preference</label>
                  <p className="text-gray-600">{candidateProfile.remote_preference || 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Resume/CV</h2>
              </CardHeader>
              <CardContent>
                {candidateProfile.cv_url ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Upload className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-900">CV uploaded</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-3">No CV uploaded</p>
                    <Link href="/dashboard/profile/edit">
                      <Button size="sm">
                        Upload CV
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Profile Completeness</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{candidateProfile.completeness_score}%</span>
                    <span className="text-sm text-gray-600">Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${candidateProfile.completeness_score}%` }}
                    ></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Basic info</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Professional details</span>
                      <span className="text-gray-400">○</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">CV upload</span>
                      <span className="text-gray-400">○</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Profile Visibility</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateProfile.is_visible ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Eye className="h-5 w-5" />
                      <span className="font-medium">Profile is visible</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <EyeOff className="h-5 w-5" />
                      <span className="font-medium">Profile is hidden</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    {candidateProfile.is_visible 
                      ? 'Companies can view and contact you'
                      : 'Complete your profile to make it visible to companies'
                    }
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    disabled={candidateProfile.completeness_score < 80}
                  >
                    {candidateProfile.is_visible ? 'Hide Profile' : 'Make Visible'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Mock company profile data - will be replaced with API call
  const companyProfile = {
    name: (profile?.profile?.company_name as string) || 'Your Company',
    email: user?.email || '',
    website: '',
    description: '',
    industry: '',
    size: '',
    location: '',
    founded: '',
    benefits: [],
    tech_stack: [],
    is_visible: false
  };

  // Company profile view
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            Preview Profile
          </Button>
          <Link href="/dashboard/profile/edit">
            <Button size="sm" className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Company Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Company Name</label>
                  <p className="text-gray-900 mt-1">{companyProfile.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Industry</label>
                  <p className="text-gray-600 mt-1">{companyProfile.industry || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Company Size</label>
                  <p className="text-gray-600 mt-1">{companyProfile.size || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Founded</label>
                  <p className="text-gray-600 mt-1">{companyProfile.founded || 'Not specified'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-600 mt-1">{companyProfile.location || 'Not specified'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Website</label>
                  <p className="text-gray-600 mt-1">{companyProfile.website || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Company Description</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {companyProfile.description || 'No company description provided yet. Add a description to help candidates understand your company culture and mission.'}
              </p>
            </CardContent>
          </Card>

          {companyProfile.tech_stack?.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Tech Stack</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {companyProfile.tech_stack.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {companyProfile.benefits?.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Benefits & Perks</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {companyProfile.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Visibility Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                {companyProfile.is_visible ? (
                  <Eye className="h-5 w-5 text-green-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
                <h3 className="font-semibold text-gray-900">Profile Visibility</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                {companyProfile.is_visible 
                  ? 'Your company profile is visible to candidates'
                  : 'Complete your profile to make it visible to candidates'
                }
              </p>
              <Button 
                variant={companyProfile.is_visible ? "outline" : "primary"} 
                size="sm" 
                className="w-full"
                disabled={!companyProfile.is_visible}
              >
                {companyProfile.is_visible ? 'Make Private' : 'Make Visible'}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Quick Stats</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Jobs</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Applications</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Profile Views</span>
                <span className="text-sm font-medium">0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}