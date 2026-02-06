import Link from 'next/link';
import { ArrowRight, Users, Zap, Target, MapPin, Clock, DollarSign } from 'lucide-react';

// Mock job data for the jobs section
const featuredJobs = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    company: 'TechFlow',
    location: 'Remote',
    salary: '$120k - $150k',
    type: 'Full-time',
    tech: ['React', 'Node.js', 'TypeScript']
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'StartupX',
    location: 'San Francisco, CA',
    salary: '$100k - $130k',
    type: 'Full-time',
    tech: ['Vue.js', 'TailwindCSS', 'GraphQL']
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    salary: '$110k - $140k',
    type: 'Full-time',
    tech: ['AWS', 'Docker', 'Kubernetes']
  },
  {
    id: 4,
    title: 'Mobile Developer',
    company: 'AppInnovate',
    location: 'Remote',
    salary: '$95k - $125k',
    type: 'Full-time',
    tech: ['React Native', 'iOS', 'Android']
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'DataFlow',
    location: 'New York, NY',
    salary: '$130k - $160k',
    type: 'Full-time',
    tech: ['Python', 'TensorFlow', 'SQL']
  },
  {
    id: 6,
    title: 'Backend Engineer',
    company: 'MicroTech',
    location: 'Seattle, WA',
    salary: '$105k - $135k',
    type: 'Full-time',
    tech: ['Python', 'Django', 'PostgreSQL']
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechFill
            </h1>
          </div>
          <nav className="flex gap-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/signup/candidate" 
              className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Modern tech workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-purple-900/80"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-white/90 text-sm font-medium">AI-Powered Matching Platform</span>
              </div>
              
              <h2 className="text-6xl md:text-7xl font-bold mb-8 text-white leading-tight">
                Find Your Next Role Through{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Mutual Interest
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                TechFill connects tech professionals with startups through intent-based matching.
                No more cold applications. Only meaningful connections.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link 
                  href="/signup/candidate" 
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  I'm a Candidate
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/signup/company" 
                  className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 flex items-center justify-center"
                >
                  I'm Hiring
                  <Users className="ml-2 h-5 w-5" />
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1000+</div>
                  <div className="text-white/80">Active Candidates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-white/80">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-white/80">Match Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section - Moved Higher */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-blue-600 text-sm font-medium">Hot Opportunities</span>
              </div>
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Browse Open Positions
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Check out the latest opportunities from innovative startups looking for talent like you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredJobs.map((job) => (
                <div key={job.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-gray-600 font-medium mb-1">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      {job.type}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/jobs" 
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Jobs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                How It Works
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our streamlined process connects the right people at the right time
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent md:rotate-90 md:w-20 md:h-1 md:translate-x-10 hidden md:block"></div>
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">Create Your Profile</h4>
                <p className="text-gray-600 leading-relaxed">
                  Candidates: Showcase your skills and preferences with our AI-powered profile builder.
                  Companies: Post your open roles with detailed requirements.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent md:rotate-90 md:w-20 md:h-1 md:translate-x-10 hidden md:block"></div>
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">Express Interest</h4>
                <p className="text-gray-600 leading-relaxed">
                  Browse opportunities and signal your interest with a single click.
                  No lengthy applications or cover letters required.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">Match & Connect</h4>
                <p className="text-gray-600 leading-relaxed">
                  When interest is mutual, connect directly through our platform.
                  Every conversation starts with genuine intent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Trusted by Top Companies
              </h3>
              <p className="text-xl text-gray-600">
                Join thousands of successful matches made on our platform
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-gray-400">LOGO</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-gray-400">LOGO</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-gray-400">LOGO</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-gray-400">LOGO</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h3 className="text-xl font-bold">TechFill</h3>
              </div>
              <p className="text-gray-400">
                Connecting tech talent with innovative companies through intent-based matching.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Candidates</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signup/candidate" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signup/company" className="hover:text-white transition-colors">Post Jobs</Link></li>
                <li><Link href="/candidates" className="hover:text-white transition-colors">Find Talent</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Notice</Link>
              </div>
              <p className="text-gray-400">&copy; 2026 TechFill. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
