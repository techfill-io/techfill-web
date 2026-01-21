# TechFill Web Application

Frontend application for TechFill - Intent-based tech talent matching platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: @tanstack/react-query
- **HTTP Client**: Axios
- **Authentication**: Supabase Auth
- **Validation**: Zod

## Project Structure

```
techfill-web/
├── app/
│   ├── (public)/          # Public routes (no auth required)
│   │   ├── page.tsx       # Landing page
│   │   ├── jobs/          # Job listings (public)
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup pages
│   ├── (authenticated)/   # Protected routes
│   │   ├── candidate/     # Candidate dashboard & features
│   │   └── company/       # Company dashboard & features
│   └── admin/             # Admin panel
├── components/            # React components
├── lib/
│   ├── api/              # API client & endpoints
│   ├── supabase/         # Supabase client (auth only)
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
├── types/                # TypeScript type definitions
└── docs/                 # Documentation

```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Running TechFill API (see techfill-api repository)
- Supabase project

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Running the App

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Architecture Principles

1. **API-First**: All data access goes through the backend API, never direct Supabase queries
2. **Role-Based Access**: Different dashboards for candidates, companies, and admins
3. **Public Job Listings**: Unauthenticated users can browse jobs
4. **Type Safety**: Full TypeScript coverage with shared types

### Key Routes

**Public Routes:**
- `/` - Landing page
- `/jobs` - Job listings (public)
- `/jobs/[id]` - Job detail
- `/login` - Login
- `/signup/candidate` - Candidate signup
- `/signup/company` - Company signup

**Protected Routes (Candidate):**
- `/candidate/profile` - Profile management
- `/candidate/applications` - View applications
- `/candidate/settings` - Account settings

**Protected Routes (Company):**
- `/company/profile` - Company profile
- `/company/jobs` - Manage jobs
- `/company/jobs/new` - Create job
- `/company/jobs/[id]/applications` - View applicants

**Admin Routes:**
- `/admin/users` - User management
- `/admin/companies` - Company management
- `/admin/jobs` - Job management

## API Integration

The frontend communicates with the backend API exclusively. No direct database access.

### API Client

Located in `lib/api/client.ts`, the API client:
- Automatically adds auth tokens to requests
- Handles errors globally
- Redirects to login on 401

### API Endpoints

All API modules are in `lib/api/`:
- `auth.ts` - Authentication endpoints
- `jobs.ts` - Job endpoints
- `candidates.ts` - Candidate profile endpoints
- `companies.ts` - Company profile endpoints
- `applications.ts` - Application endpoints

Example usage:
```typescript
import { jobsApi } from '@/lib/api/jobs';

const jobs = await jobsApi.getAll({ is_remote: true });
```

## Authentication Flow

1. User signs up via Supabase Auth
2. Supabase creates user and returns JWT token
3. Frontend calls API to create candidate/company profile
4. Token stored in Supabase client (auto-handled)
5. All subsequent API calls include token via interceptor

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

```bash
vercel
```

### Environment Variables (Production)

Required variables:
- `NEXT_PUBLIC_API_URL` - Production API URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

## Related Repositories

- **Backend API**: `techfill-api` (NestJS)
- **Documentation**: See `/docs` folder

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Split Repository Plan](./docs/SPLIT-REPO-PLAN.md)

## Contributing

This is a private project. For the MVP phase, direct commits to main are acceptable.
Later, implement:
- Feature branches
- Pull request reviews
- CI/CD checks

## License

Proprietary - All rights reserved
