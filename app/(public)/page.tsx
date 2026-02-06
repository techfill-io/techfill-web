import Link from 'next/link';
import { Search, MapPin, Building2, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Particles from '@/components/ui/Particles';

// Mock startup data
const featuredStartups = [
  {
    id: 1,
    name: 'TechFlow',
    description: 'AI-powered workflow automation for modern teams',
    logo: 'TF',
    jobCount: 8,
    location: 'Stockholm, Sweden'
  },
  {
    id: 2,
    name: 'GreenTech Solutions',
    description: 'Sustainable technology for a better tomorrow',
    logo: 'GT',
    jobCount: 5,
    location: 'Copenhagen, Denmark'
  },
  {
    id: 3,
    name: 'FinanceFlow',
    description: 'Next-gen financial services platform',
    logo: 'FF',
    jobCount: 12,
    location: 'Oslo, Norway'
  },
  {
    id: 4,
    name: 'DataMind',
    description: 'Machine learning insights for business growth',
    logo: 'DM',
    jobCount: 6,
    location: 'Helsinki, Finland'
  },
  {
    id: 5,
    name: 'CloudScale',
    description: 'Scalable cloud infrastructure solutions',
    logo: 'CS',
    jobCount: 9,
    location: 'Stockholm, Sweden'
  },
  {
    id: 6,
    name: 'MedTech Innovations',
    description: 'Digital healthcare transformation',
    logo: 'MI',
    jobCount: 4,
    location: 'Copenhagen, Denmark'
  }
];

// Job categories with counts
const jobCategories = [
  { name: 'Engineering', count: 127, color: 'bg-blue-50 text-blue-700' },
  { name: 'Product & Design', count: 89, color: 'bg-purple-50 text-purple-700' },
  { name: 'Marketing & Growth', count: 64, color: 'bg-green-50 text-green-700' },
  { name: 'Sales & Business', count: 52, color: 'bg-orange-50 text-orange-700' },
  { name: 'Operations', count: 38, color: 'bg-gray-50 text-gray-700' },
  { name: 'Data & Analytics', count: 43, color: 'bg-indigo-50 text-indigo-700' }
];

// Recent jobs
const recentJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechFlow',
    location: 'Stockholm, Sweden',
    category: 'Engineering',
    posted: '2 days ago',
    remote: true
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'GreenTech Solutions',
    location: 'Copenhagen, Denmark',
    category: 'Product & Design',
    posted: '1 day ago',
    remote: false
  },
  {
    id: 3,
    title: 'Growth Marketing Manager',
    company: 'FinanceFlow',
    location: 'Oslo, Norway',
    category: 'Marketing & Growth',
    posted: '3 days ago',
    remote: true
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'DataMind',
    location: 'Helsinki, Finland',
    category: 'Data & Analytics',
    posted: '5 days ago',
    remote: true
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                TechFill
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/jobs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Find jobs
                </Link>
                <Link href="/startups" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Browse startups
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Pricing
                </Link>
                <Link href="/for-startups" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  For startups
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Log in
              </Link>
              <Link href="/signup/candidate" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4">
        <section className="relative py-24 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 -mx-4">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Team celebrating success"
              className="w-full h-full object-cover"
            />
            {/* Black overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Particle Animation Overlay */}
            <div className="absolute inset-0">
              <Particles
                particleColors={["#ffffff", "#3b82f6"]}
                particleCount={100}
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find your next exciting startup job
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover opportunities at innovative Nordic startups. Connect with companies that value your talent.
            </p>
          </div>

          {/* Search Section */}
          <div className="relative z-10 max-w-4xl mx-auto mb-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job title or keyword</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="e.g. Frontend Developer"
                      className="pl-10 border-gray-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md text-gray-700 bg-white appearance-none">
                      <option>All Nordic</option>
                      <option>Sweden</option>
                      <option>Denmark</option>
                      <option>Norway</option>
                      <option>Finland</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    Search jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Categories - Move outside hero */}
        <section className="py-16">
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by category</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {jobCategories.map((category) => (
                <Link
                  key={category.name}
                  href={`/jobs?category=${category.name.toLowerCase()}`}
                  className="group p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {category.count} open positions
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                      {category.count}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Startups */}
        <section className="py-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured startups</h2>
            <p className="text-gray-600">Innovative companies actively hiring in the Nordics</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredStartups.map((startup) => (
              <Link
                key={startup.id}
                href={`/startup/${startup.id}`}
                className="group p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{startup.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {startup.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {startup.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-gray-500 text-xs">{startup.location}</span>
                      <span className="text-blue-600 text-sm font-medium">
                        {startup.jobCount} jobs
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/startups" className="text-blue-600 hover:text-blue-700 font-medium">
              View all startups →
            </Link>
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest jobs</h2>
            <Link href="/jobs" className="text-blue-600 hover:text-blue-700 font-medium">
              View all jobs →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                href={`/job/${job.id}`}
                className="group block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      {job.remote && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                          Remote
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="font-medium">{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-sm">{job.posted}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">TechFill</h3>
              <p className="text-gray-600 text-sm">
                Connecting Nordic talent with innovative startups.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For job seekers</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/jobs" className="hover:text-gray-900">Browse jobs</Link></li>
                <li><Link href="/signup/candidate" className="hover:text-gray-900">Create profile</Link></li>
                <li><Link href="/guide" className="hover:text-gray-900">Job search guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For startups</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/for-startups" className="hover:text-gray-900">Post jobs</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact sales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 mt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2026 TechFill. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
