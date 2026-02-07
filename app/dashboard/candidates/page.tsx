'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Code, 
  Star, 
  Eye, 
  Filter,
  Users,
  User,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// Mock candidate data - will be replaced with API calls
const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Johnson',
    headline: 'Senior Full-Stack Developer',
    location: 'San Francisco, CA',
    experience: '5+ years',
    tech_stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    employment_preference: 'Full-time',
    looking_for: 'Remote or hybrid opportunities',
    profile_image: null,
    is_premium: true,
    match_score: 95
  },
  {
    id: '2',
    name: 'Alex Chen',
    headline: 'Frontend Developer & UI/UX Designer',
    location: 'Austin, TX',
    experience: '3+ years',
    tech_stack: ['React', 'Vue.js', 'Figma', 'TailwindCSS'],
    employment_preference: 'Full-time',
    looking_for: 'Growth opportunities in fintech',
    profile_image: null,
    is_premium: false,
    match_score: 88
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    headline: 'DevOps Engineer',
    location: 'Remote',
    experience: '4+ years',
    tech_stack: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    employment_preference: 'Full-time',
    looking_for: 'Remote DevOps role in fast-growing startup',
    profile_image: null,
    is_premium: true,
    match_score: 92
  },
  {
    id: '4',
    name: 'David Kim',
    headline: 'Backend Engineer',
    location: 'Seattle, WA',
    experience: '6+ years',
    tech_stack: ['Python', 'Django', 'Redis', 'MongoDB'],
    employment_preference: 'Full-time',
    looking_for: 'Senior backend role with mentoring opportunities',
    profile_image: null,
    is_premium: false,
    match_score: 85
  },
  {
    id: '5',
    name: 'Lisa Wang',
    headline: 'Data Scientist & ML Engineer',
    location: 'New York, NY',
    experience: '4+ years',
    tech_stack: ['Python', 'TensorFlow', 'PyTorch', 'SQL'],
    employment_preference: 'Full-time',
    looking_for: 'AI/ML role in healthcare or finance',
    profile_image: null,
    is_premium: true,
    match_score: 90
  }
];

export default function CandidatesPage() {
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [techStackFilter, setTechStackFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Redirect if not a company
  if (profile?.role !== 'company') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">Only companies can access the candidates directory.</p>
      </div>
    );
  }

  // Filter candidates based on search and filters
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.tech_stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !locationFilter || candidate.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesExperience = !experienceFilter || candidate.experience.includes(experienceFilter);
    const matchesTechStack = !techStackFilter || candidate.tech_stack.some(tech => 
      tech.toLowerCase().includes(techStackFilter.toLowerCase())
    );

    return matchesSearch && matchesLocation && matchesExperience && matchesTechStack;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Candidates</h1>
        <p className="text-gray-600">Discover talented developers looking for their next opportunity</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search candidates by name, skills, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                {filteredCandidates.length} candidates found
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    placeholder="e.g. San Francisco, Remote"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <Select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    options={[
                      { value: '', label: 'Any Experience' },
                      { value: '1', label: '1+ years' },
                      { value: '2', label: '2+ years' },
                      { value: '3', label: '3+ years' },
                      { value: '4', label: '4+ years' },
                      { value: '5', label: '5+ years' },
                      { value: '6', label: '6+ years' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
                  <Input
                    placeholder="e.g. React, Python, AWS"
                    value={techStackFilter}
                    onChange={(e) => setTechStackFilter(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Profile Picture Placeholder */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>

                    {/* Candidate Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        {candidate.is_premium && (
                          <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                        )}
                        <div className="flex items-center text-sm text-green-600 font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          {candidate.match_score}% Match
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{candidate.headline}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {candidate.experience}
                        </div>
                        <div className="flex items-center">
                          <Code className="h-4 w-4 mr-1" />
                          {candidate.employment_preference}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {candidate.tech_stack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Looking For */}
                      <p className="text-sm text-gray-600 italic">&quot;{candidate.looking_for}&quot;</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm" className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}