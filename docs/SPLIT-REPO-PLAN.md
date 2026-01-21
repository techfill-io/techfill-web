# TechFill.io - Split Repository Architecture

## Repository Structure

### Separate Repositories:
```
techfill-web/          # Next.js frontend (this repo)
techfill-api/          # NestJS backend (separate repo)
techfill-shared/       # Shared TypeScript types (optional, can use npm package)
```

**Alternative simpler approach:**
```
techfill-web/          # Next.js frontend
techfill-api/          # NestJS backend with types exported as package
```

## Current Repository: techfill-web (Next.js)

This repository (`/Users/petemihaylov/Desktop/git/techfill-web`) is the **frontend application**.

### Structure:
```
techfill-web/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── (public)/             # Public routes (no auth required)
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx      # Job listing (public)
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Job detail
│   │   │   ├── companies/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Company profile
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       ├── candidate/
│   │   │       │   └── page.tsx
│   │   │       └── company/
│   │   │           └── page.tsx
│   │   ├── (authenticated)/      # Protected routes
│   │   │   ├── layout.tsx        # Auth check wrapper
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx      # Role-based redirect
│   │   │   ├── candidate/
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── applications/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── company/
│   │   │       ├── profile/
│   │   │       │   └── page.tsx
│   │   │       ├── jobs/
│   │   │       │   ├── page.tsx          # List company's jobs
│   │   │       │   ├── new/
│   │   │       │   │   └── page.tsx      # Create job
│   │   │       │   └── [id]/
│   │   │       │       ├── edit/
│   │   │       │       │   └── page.tsx
│   │   │       │       └── applications/
│   │   │       │           └── page.tsx  # View applicants
│   │   │       └── settings/
│   │   │           └── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin role check
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── companies/
│   │   │   └── jobs/
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                   # Shadcn/ui components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── jobs/
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   ├── JobFilters.tsx
│   │   │   └── JobForm.tsx
│   │   ├── candidates/
│   │   │   ├── ProfileForm.tsx
│   │   │   └── CVUpload.tsx
│   │   ├── companies/
│   │   │   └── CompanyForm.tsx
│   │   └── applications/
│   │       ├── ApplicationCard.tsx
│   │       └── ApplicationList.tsx
│   ├── lib/
│   │   ├── api/                  # API client
│   │   │   ├── client.ts         # Axios/fetch wrapper
│   │   │   ├── auth.ts           # Auth endpoints
│   │   │   ├── jobs.ts           # Job endpoints
│   │   │   ├── candidates.ts     # Candidate endpoints
│   │   │   ├── companies.ts      # Company endpoints
│   │   │   └── applications.ts   # Application endpoints
│   │   ├── supabase/
│   │   │   └── client.ts         # Supabase client (auth only)
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useJobs.ts
│   │   │   └── useApplications.ts
│   │   └── utils/
│   │       ├── validation.ts
│   │       └── formatting.ts
│   ├── types/                    # Frontend-specific types
│   │   ├── api.ts                # API response types (import from API or duplicate)
│   │   ├── forms.ts
│   │   └── components.ts
│   └── middleware.ts             # Auth middleware
├── public/
│   ├── images/
│   └── fonts/
├── .env.local.example
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## New Repository: techfillio-api (NestJS)

Create this as a separate repository.

### Structure:
```
techfillio-api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── ownership.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── dto/
│   │       ├── signup.dto.ts
│   │       └── login.dto.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   ├── candidates/
│   │   ├── candidates.module.ts
│   │   ├── candidates.controller.ts
│   │   ├── candidates.service.ts
│   │   ├── entities/
│   │   │   └── candidate-profile.entity.ts
│   │   └── dto/
│   │       ├── create-profile.dto.ts
│   │       └── update-profile.dto.ts
│   ├── companies/
│   │   ├── companies.module.ts
│   │   ├── companies.controller.ts
│   │   ├── companies.service.ts
│   │   ├── entities/
│   │   │   └── company.entity.ts
│   │   └── dto/
│   ├── jobs/
│   │   ├── jobs.module.ts
│   │   ├── jobs.controller.ts
│   │   ├── jobs.service.ts
│   │   ├── entities/
│   │   │   └── job.entity.ts
│   │   └── dto/
│   │       ├── create-job.dto.ts
│   │       ├── update-job.dto.ts
│   │       └── job-filters.dto.ts
│   ├── applications/
│   │   ├── applications.module.ts
│   │   ├── applications.controller.ts
│   │   ├── applications.service.ts
│   │   ├── entities/
│   │   │   └── application.entity.ts
│   │   └── dto/
│   ├── storage/
│   │   ├── storage.module.ts
│   │   ├── storage.service.ts        # Supabase Storage integration
│   │   └── dto/
│   │       └── upload.dto.ts
│   ├── admin/
│   │   ├── admin.module.ts
│   │   ├── admin.controller.ts
│   │   └── admin.service.ts
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── types/
│   │       └── index.ts              # Shared types (export as package)
│   └── database/
│       ├── database.module.ts
│       └── supabase.client.ts
├── supabase/
│   ├── migrations/
│   │   ├── 20240101000000_initial_schema.sql
│   │   ├── 20240101000001_create_profiles.sql
│   │   ├── 20240101000002_create_candidate_profiles.sql
│   │   ├── 20240101000003_create_companies.sql
│   │   ├── 20240101000004_create_jobs.sql
│   │   └── 20240101000005_create_applications.sql
│   └── seed.sql
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example
├── .env
├── nest-cli.json
├── tsconfig.json
├── package.json
└── README.md
```

---

## Shared Types Strategy

### Option 1: Duplicate Types (Simplest for MVP)
- Each repo has its own type definitions
- Copy/paste when needed
- **Pros**: No dependency management, fast iteration
- **Cons**: Can drift out of sync

### Option 2: API Exports Types as NPM Package
- Backend exports types
- Frontend installs `@techfillio/api-types` package
- **Pros**: Single source of truth
- **Cons**: Requires private NPM registry or GitHub packages

### Option 3: Separate Shared Package (Most Complex)
- `techfillio-shared` repository
- Both frontend and backend import from it
- **Cons**: Extra overhead for MVP

**Recommendation for MVP: Option 1 (duplicate types)**
- Revisit when types start drifting

---

## Environment Variables

### Frontend (.env.local)
```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:3001
# or production: https://api.techfillio.com

# Supabase (for auth only)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (.env)
```bash
# Server
PORT=3001
NODE_ENV=development

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

# Database (if using direct connection)
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# JWT (if not using Supabase JWT)
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1h

# Storage
STORAGE_BUCKET_CVS=cvs
STORAGE_BUCKET_LOGOS=company-logos

# CORS
CORS_ORIGIN=http://localhost:3000,https://techfillio.com

# Email (optional for MVP)
# EMAIL_SERVICE=resend
# EMAIL_API_KEY=your-api-key
```

---

## API Communication Flow

### Frontend → Backend → Supabase

```
User Action (Frontend)
    ↓
Next.js API Client (lib/api/client.ts)
    ↓
HTTP Request to NestJS API
    ↓
NestJS Controller
    ↓
Auth Guard (verify JWT)
    ↓
Role Guard (check permissions)
    ↓
Service Layer
    ↓
Supabase Client (query database)
    ↓
Response back to Frontend
```

### Authentication Flow

```
1. User signs up
   → Frontend calls Supabase Auth (supabase.auth.signUp)
   → Supabase creates user
   → Frontend receives JWT token
   → Frontend calls API to create profile (with token)
   → API verifies token and creates candidate/company profile

2. User logs in
   → Frontend calls Supabase Auth (supabase.auth.signInWithPassword)
   → Supabase returns JWT token
   → Frontend stores token
   → Frontend calls GET /auth/me with token
   → API returns user profile and role
   → Frontend redirects to appropriate dashboard

3. Protected API calls
   → Frontend sends JWT in Authorization header
   → API verifies JWT with Supabase
   → API checks user role and permissions
   → API processes request
```

---

## API Client Example (Frontend)

### lib/api/client.ts
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

export default api;
```

### lib/api/jobs.ts
```typescript
import api from './client';

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  seniority: string;
  tech_stack: string[];
  location: string;
  is_remote: boolean;
  status: 'draft' | 'active' | 'closed';
  created_at: string;
  company?: {
    name: string;
    logo_url: string;
  };
}

export const jobsApi = {
  getAll: (filters?: JobFilters) =>
    api.get<Job[]>('/jobs', { params: filters }),

  getById: (id: string) =>
    api.get<Job>(`/jobs/${id}`),

  create: (data: CreateJobDto) =>
    api.post<Job>('/jobs', data),

  update: (id: string, data: UpdateJobDto) =>
    api.put<Job>(`/jobs/${id}`, data),

  delete: (id: string) =>
    api.delete(`/jobs/${id}`),
};
```

---

## Development Workflow

### Initial Setup

1. **Frontend (this repo)**
```bash
cd /Users/petemihaylov/Desktop/git/techfillio

# Initialize Next.js with TypeScript
npm install

# Install dependencies
npm install @supabase/supabase-js @tanstack/react-query axios zod
npm install -D tailwindcss postcss autoprefixer
```

2. **Backend (new repo)**
```bash
cd /Users/petemihaylov/Desktop/git
mkdir techfillio-api
cd techfillio-api

# Create NestJS app
npx @nestjs/cli new . --package-manager npm

# Install dependencies
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @supabase/supabase-js
npm install class-validator class-transformer
```

### Running Both Apps

**Terminal 1 (Backend):**
```bash
cd techfillio-api
npm run start:dev  # Runs on http://localhost:3001
```

**Terminal 2 (Frontend):**
```bash
cd techfillio
npm run dev  # Runs on http://localhost:3000
```

---

## Deployment

### Frontend (Vercel)
```bash
# In techfillio-web repo
vercel

# Environment variables in Vercel dashboard:
NEXT_PUBLIC_API_URL=https://api.techfillio.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Backend (Railway / Render / Fly.io)

**Railway:**
```bash
# In techfillio-api repo
railway login
railway init
railway up

# Set environment variables in Railway dashboard
```

**Alternative: Render**
- Connect GitHub repo
- Set build command: `npm install && npm run build`
- Set start command: `npm run start:prod`
- Add environment variables

---

## Git Setup

### Frontend (current repo)
```bash
cd /Users/petemihaylov/Desktop/git/techfillio

# If not already a git repo
git init
git add .
git commit -m "Initial Next.js frontend setup"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/techfillio-web.git
git branch -M main
git push -u origin main
```

### Backend (new repo)
```bash
cd /Users/petemihaylov/Desktop/git/techfillio-api

git init
git add .
git commit -m "Initial NestJS backend setup"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/techfillio-api.git
git branch -M main
git push -u origin main
```

---

## Next Steps

1. **Now**: Set up Supabase project
2. **Then**: Bootstrap Next.js frontend (this repo)
3. **Then**: Create and bootstrap NestJS backend
4. **Then**: Create database migrations
5. **Then**: Implement auth flow
6. **Then**: Build first feature (job listing)

---

## Questions Resolved

✅ Repository structure: **Split repos**
✅ Backend: **NestJS**
✅ Frontend: **Next.js** (full platform after login + public job listing)
✅ Landing page: **Part of Next.js app**

## Still Need to Decide

- Company approval: Auto-approve or manual review?
- Email service: Which provider?
- Deployment: Vercel + Railway? Other?

Ready to start scaffolding?
