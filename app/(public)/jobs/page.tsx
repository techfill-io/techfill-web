export default function JobsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TechFill</h1>
          <nav className="flex gap-4">
            <a href="/" className="px-4 py-2 text-sm font-medium hover:underline">
              Home
            </a>
            <a href="/login" className="px-4 py-2 text-sm font-medium hover:underline">
              Log in
            </a>
            <a href="/signup/candidate" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign up
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Open Positions</h1>
          <p className="text-gray-600">
            Browse the latest opportunities from startups looking for tech talent.
          </p>
        </div>

        {/* Filters - Placeholder */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>All Roles</option>
                <option>Frontend Engineer</option>
                <option>Backend Engineer</option>
                <option>Full Stack Engineer</option>
                <option>DevOps Engineer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Seniority</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>All Levels</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
                <option>Lead</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>All Locations</option>
                <option>Remote</option>
                <option>London</option>
                <option>Berlin</option>
                <option>Amsterdam</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tech Stack</label>
              <input
                type="text"
                placeholder="e.g., React, Node.js"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Job Listings - Placeholder */}
        <div className="space-y-4">
          {/* Placeholder job cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Senior Full Stack Engineer
                  </h3>
                  <p className="text-gray-600">TechStartup Inc.</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Remote
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                We're looking for a senior engineer to help build our next-generation
                fintech platform. You'll work with React, Node.js, and TypeScript.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  React
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  Node.js
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  TypeScript
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  PostgreSQL
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted 2 days ago</span>
                <a
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                >
                  Express Interest
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (when no jobs) */}
        {/* <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
        </div> */}
      </main>
    </div>
  );
}
