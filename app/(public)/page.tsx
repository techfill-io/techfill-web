import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TechFill</h1>
          <nav className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium hover:underline">
              Log in
            </Link>
            <Link href="/signup/candidate" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Find Your Next Role Through{' '}
            <span className="text-blue-600">Mutual Interest</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TechFill connects tech professionals with startups through intent-based matching.
            No more cold applications. Only meaningful connections.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup/candidate" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
              I'm a Candidate
            </Link>
            <Link href="/signup/company" className="px-6 py-3 bg-gray-100 text-gray-900 rounded-md font-medium hover:bg-gray-200">
              I'm Hiring
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Create Your Profile</h4>
                <p className="text-gray-600">
                  Candidates: Showcase your skills and preferences.
                  Companies: Post your open roles.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Express Interest</h4>
                <p className="text-gray-600">
                  Browse opportunities and signal your interest.
                  No lengthy applications required.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Match & Connect</h4>
                <p className="text-gray-600">
                  When interest is mutual, connect directly.
                  Every conversation starts with intent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Jobs CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">Browse Open Positions</h3>
            <p className="text-gray-600 mb-8">
              Check out the latest opportunities from startups looking for talent like you.
            </p>
            <Link href="/jobs" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 inline-block">
              View All Jobs
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/cookies" className="hover:underline">Cookie Notice</Link>
          </div>
          <p>&copy; 2024 TechFill. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
