# TechFill.io - Platform Architecture Plan

## Executive Summary

**Goal**: Build a Wellfound-style platform (Phase 1) with foundations for intent-based matching (Phase 2)

**Architecture**: Monorepo with separate deployable units

**Core Principle**: API-first, role-based access control, job-centric data model

---

## 1. Repository Structure

### Recommended: Monorepo

**Why monorepo?**
- Shared TypeScript types between frontend and backend
- Atomic commits across API and UI changes
- Single CI/CD pipeline
- Easier refactoring

**Structure:**
```
techfillio/
├── apps/
│   ├── web/                    # Next.js frontend
│   ├── api/                    # Backend API (Node.js/NestJS or .NET)
│   └── landing/                # Marketing site (optional Webflow integration)
├── packages/
│   ├── types/                  # Shared TypeScript types
│   ├── database/               # Supabase migrations & schemas
│   ├── ui/                     # Shared UI components (if needed)
│   └── config/                 # Shared config (ESLint, TS, etc.)
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── DEPLOYMENT.md
├── .github/
│   └── workflows/              # CI/CD
├── package.json                # Workspace root
└── turbo.json / nx.json        # Monorepo orchestration
```

**Alternative: Multi-repo**
```
techfillio-web/                 # Next.js
techfillio-api/                 # Backend
techfillio-infra/               # Infrastructure as code
```

**Verdict**: Start with **monorepo** unless you have strong DevOps constraints.

---

## 2. Technology Stack Recommendation

### Frontend: Next.js
- **Why**: SSR for SEO, React ecosystem, API routes for simple endpoints
- **Deployment**: Vercel (easiest) or self-hosted
- **Key libraries**:
  - `@supabase/supabase-js` (auth only)
  - `react-query` / `@tanstack/query` (API state)
  - `zod` (validation)
  - `tailwindcss` (styling)

### Backend: NestJS (Node.js)
**Why NestJS over raw Express or .NET?**
- TypeScript native (share types with frontend)
- Built-in DI, guards, interceptors (perfect for role-based access)
- Faster to iterate than .NET for MVP
- Easy to swap to .NET later if needed

**Structure:**
```
apps/api/
├── src/
│   ├── auth/                   # Supabase auth integration
│   ├── candidates/             # Candidate profile endpoints
│   ├── companies/              # Company profile endpoints
│   ├── jobs/                   # Job CRUD
│   ├── applications/           # Application flow
│   ├── matching/               # (Phase 2)
│   ├── admin/                  # Admin endpoints
│   ├── common/
│   │   ├── guards/             # RoleGuard, OwnershipGuard
│   │   ├── decorators/         # @CurrentUser, @Roles
│   │   └── filters/            # Error handling
│   └── main.ts
└── test/
```

**Alternative: .NET 8**
If you prefer C#:
- More enterprise-friendly
- Better performance at scale
- Stricter typing
- Slightly slower iteration

---

## 3. Database Schema (Supabase Postgres)

### Core Tables

#### 1. `users` (managed by Supabase Auth)
```sql
-- Extended via auth.users metadata or separate table
-- Supabase manages: id, email, encrypted_password, email_confirmed_at
```

#### 2. `profiles` (1:1 with users)
```sql
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('candidate', 'company', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. `candidate_profiles`
```sql
CREATE TABLE candidate_profiles (
  user_id UUID PRIMARY KEY REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT,
  headline TEXT,
  seniority TEXT CHECK (seniority IN ('junior', 'mid', 'senior', 'lead', 'principal')),
  tech_stack TEXT[] DEFAULT '{}',
  employment_preference TEXT, -- 'full-time', 'contract', 'both'
  remote_preference TEXT,     -- 'remote', 'hybrid', 'onsite'
  cv_url TEXT,                -- Supabase Storage URL
  is_visible BOOLEAN DEFAULT FALSE,
  completeness_score INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_candidate_visible ON candidate_profiles(is_visible) WHERE is_visible = TRUE;
CREATE INDEX idx_candidate_tech_stack ON candidate_profiles USING GIN(tech_stack);
```

#### 4. `companies`
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  industry TEXT,
  team_size TEXT,
  location TEXT,
  website TEXT,
  logo_url TEXT,
  is_approved BOOLEAN DEFAULT TRUE, -- Set FALSE if you want manual approval
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(owner_user_id) -- One company per user for MVP
);
```

#### 5. `jobs`
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  seniority TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  location TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_company ON jobs(company_id);
CREATE INDEX idx_jobs_tech_stack ON jobs USING GIN(tech_stack);
```

#### 6. `applications`
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied' CHECK (
    status IN ('applied', 'reviewed', 'interview', 'rejected', 'hired', 'withdrawn')
  ),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(job_id, candidate_id) -- One application per job per candidate
);

CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_status ON applications(status);
```

#### 7. Future: `interests` (Phase 2)
```sql
CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('candidate_to_job', 'company_to_candidate')),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(job_id, candidate_id, type)
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(job_id, candidate_id)
);
```

---

## 4. API Design Principles

### Rule 1: No Direct Supabase Access from Frontend
**Frontend should NEVER:**
- Query `candidate_profiles` directly
- Query `applications` directly
- Use Supabase RLS as primary authorization

**Why?**
- Business logic in database is hard to test and change
- RLS policies are hard to audit
- API gives you single source of truth for permissions

### Rule 2: Role-Based Guards

**Example (NestJS):**
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('company')
@Get('/jobs/:id/applications')
async getApplications(
  @Param('id') jobId: string,
  @CurrentUser() user: User
) {
  // Verify user owns this job's company
  const job = await this.jobsService.findOne(jobId);
  if (job.company.owner_user_id !== user.id) {
    throw new ForbiddenException();
  }

  return this.applicationsService.findByJob(jobId);
}
```

### Rule 3: Job-Centric Data Access

**Companies CANNOT:**
- See all candidates
- Search candidates directly

**Companies CAN:**
- See applicants to their jobs
- See candidate profiles ONLY if they applied

**This keeps you GDPR-safe and ready for intent-matching.**

---

## 5. Key API Endpoints (MVP)

### Auth
```
POST   /auth/signup/candidate
POST   /auth/signup/company
POST   /auth/login
POST   /auth/logout
GET    /auth/me
```

### Candidates
```
GET    /candidates/profile         # Own profile
PUT    /candidates/profile
PATCH  /candidates/visibility      # Toggle is_visible
POST   /candidates/cv              # Upload to Supabase Storage
```

### Companies
```
GET    /companies/profile
PUT    /companies/profile
```

### Jobs
```
GET    /jobs                       # Public list (filtered)
GET    /jobs/:id                   # Public detail
POST   /jobs                       # Create (company only)
PUT    /jobs/:id                   # Update (owner only)
PATCH  /jobs/:id/status            # Change status
```

### Applications
```
POST   /jobs/:id/apply             # Candidate applies
GET    /applications               # Candidate sees own
DELETE /applications/:id           # Withdraw

GET    /jobs/:id/applications      # Company sees applicants (owner only)
PATCH  /applications/:id/status    # Company updates status
```

### Admin
```
GET    /admin/users
GET    /admin/companies
PATCH  /admin/companies/:id/approve
DELETE /admin/jobs/:id
```

---

## 6. Permission Matrix (Enforced in API)

| Action                     | Candidate | Company | Admin |
|----------------------------|-----------|---------|-------|
| View jobs (list)           | ✅         | ✅       | ✅     |
| View job detail            | ✅         | ✅       | ✅     |
| Apply to job               | ✅         | ❌       | ❌     |
| Withdraw application       | ✅ (own)   | ❌       | ❌     |
| View own applications      | ✅         | ❌       | ❌     |
| View job's applications    | ❌         | ✅ (own) | ✅     |
| View candidate CV          | ✅ (own)   | ✅ (if applied) | ✅ |
| Create job                 | ❌         | ✅       | ❌     |
| Edit job                   | ❌         | ✅ (own) | ✅     |
| Delete job                 | ❌         | ✅ (own) | ✅     |
| Approve company            | ❌         | ❌       | ✅     |

---

## 7. Supabase Configuration

### Auth Settings
- Email + password (or magic link)
- Email confirmation required
- JWT expiry: 1 hour (with refresh token)

### Storage Buckets
```
cvs/                    # Candidate CVs
  {user_id}/cv.pdf

company-logos/          # Company logos
  {company_id}/logo.png
```

**Storage policies:**
- CVs: Only accessible by candidate (owner) and companies they applied to
- Logos: Public read

### Row Level Security (RLS)
**Minimal RLS** - API handles most authorization

Only use RLS for:
- Users can only read/update their own `profiles`
- Users can only read/update their own `candidate_profiles`
- Storage: CVs only accessible by owner + via signed URLs from API

---

## 8. Frontend Architecture (Next.js)

### Route Structure
```
app/
├── (public)/
│   ├── page.tsx                 # Landing page
│   ├── jobs/
│   │   ├── page.tsx             # Job listing
│   │   └── [id]/page.tsx        # Job detail
│   ├── companies/
│   │   └── [id]/page.tsx        # Company profile
│   ├── login/
│   └── signup/
│       ├── candidate/
│       └── company/
├── (authenticated)/
│   ├── dashboard/               # Role-based redirect
│   ├── candidate/
│   │   ├── profile/
│   │   ├── applications/
│   │   └── settings/
│   └── company/
│       ├── profile/
│       ├── jobs/
│       │   ├── new/
│       │   └── [id]/
│       │       ├── edit/
│       │       └── applications/
│       └── settings/
└── admin/
    ├── users/
    ├── companies/
    └── jobs/
```

### State Management
- `@tanstack/react-query` for server state
- Local state only for forms
- No Redux needed for MVP

---

## 9. Deployment Strategy

### Option A: Full Vercel (Easiest)
- **Frontend**: Vercel (Next.js)
- **Backend**: Vercel Serverless Functions or Railway
- **Database**: Supabase (hosted)
- **Storage**: Supabase Storage

### Option B: Self-hosted (More control)
- **Frontend**: Vercel or Netlify
- **Backend**: Railway / Render / Fly.io
- **Database**: Supabase (hosted) or self-hosted Postgres
- **Storage**: Supabase Storage or AWS S3

### CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-api:
    # Deploy backend

  deploy-web:
    # Deploy frontend

  migrate-db:
    # Run Supabase migrations
```

---

## 10. Migration to Intent-Based Matching (Phase 2)

### What Changes:
1. Replace `applications` table with `interests` table
2. Add `matches` table
3. Hide CV URLs until match occurs
4. Update API endpoints:
   - `POST /jobs/:id/apply` → `POST /jobs/:id/express-interest`
   - Add `POST /candidates/:id/express-interest` (company side)
   - Add matching logic

### What Stays:
- User roles
- Profile structures
- Job structures
- Company structures
- Permission system

**This is why the architecture matters: Phase 2 is additive, not destructive.**

---

## 11. MVP Development Timeline

### Week 1: Foundation
- [ ] Repository setup (monorepo with Turborepo/Nx)
- [ ] Supabase project setup
- [ ] Database schema + migrations
- [ ] API scaffolding (NestJS or .NET)
- [ ] Landing page (Next.js)

### Week 2: Auth + Profiles
- [ ] Auth flow (signup, login, email verification)
- [ ] Candidate profile CRUD
- [ ] Company profile CRUD
- [ ] CV upload to Supabase Storage

### Week 3: Jobs + Applications
- [ ] Job CRUD endpoints
- [ ] Job listing page (public)
- [ ] Job detail page
- [ ] Application flow (candidate)
- [ ] Application management (company)

### Week 4: Dashboards + Search
- [ ] Candidate dashboard
- [ ] Company dashboard
- [ ] Job search + filters
- [ ] Email notifications (SendGrid/Resend)

### Week 5: Polish + Admin
- [ ] Admin panel (basic)
- [ ] Error handling
- [ ] Validation
- [ ] GDPR compliance (data export, deletion)

### Week 6: QA + Launch
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Soft launch

---

## 12. Non-Negotiables (Don't Skip These)

1. **Never trust the frontend** - All permissions in API
2. **Job-centric access** - Companies see candidates via jobs only
3. **Reversible actions** - Withdraw, unpublish, close
4. **Separate auth from business logic** - Supabase = auth, API = rules
5. **Type safety** - Share types between frontend and backend
6. **Database migrations** - Never manually edit production schema

---

## 13. Tech Stack Summary

| Layer        | Technology     | Why                              |
|--------------|----------------|----------------------------------|
| Frontend     | Next.js 14     | SSR, SEO, React ecosystem        |
| API          | NestJS         | TypeScript, DI, guards           |
| Database     | Supabase       | Postgres + Auth + Storage        |
| File Storage | Supabase       | Integrated, easy signed URLs     |
| Hosting      | Vercel + Railway | Fast iteration, auto-scaling   |
| Monorepo     | Turborepo      | Fast builds, shared packages     |
| Email        | Resend         | Developer-friendly               |

---

## 14. Open Questions to Decide

1. **Landing page**: Webflow embed or Next.js native?
2. **API language**: NestJS (Node) or .NET 8?
3. **Admin panel**: Custom-built or Retool/Forest Admin?
4. **Email service**: SendGrid, Postmark, or Resend?
5. **Monorepo tool**: Turborepo or Nx?
6. **Company approval**: Manual or automatic?

---

## 15. What's Next?

### Immediate Actions:
1. **Decide**: NestJS vs .NET for API
2. **Create** monorepo structure
3. **Setup** Supabase project
4. **Define** shared TypeScript types
5. **Bootstrap** Next.js app
6. **Bootstrap** API project

### First PR Should Contain:
- Working auth (signup + login)
- Empty dashboard pages
- API health check endpoint
- Database migrations (initial schema)
- CI/CD pipeline

---

**This architecture is boring, proven, and scalable.**

You can build Phase 1 in 6 weeks and add intent-matching in Phase 2 without rewrites.

Let me know which tech stack questions you want to decide on, and I'll help you scaffold the project.
