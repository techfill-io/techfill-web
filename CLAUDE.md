# CLAUDE.md - TechFill Web

## Project Overview

TechFill is an intent-based tech talent matching platform. The frontend is a Next.js application that communicates with a separate NestJS backend API. Supabase is used for authentication only — the frontend never queries the database directly.

**Phase 1 (current):** Wellfound-style job board with direct applications.
**Phase 2 (planned):** Mutual-interest matching system (architecture already supports it).

## Tech Stack

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 3
- **State Management:** @tanstack/react-query (server state)
- **HTTP Client:** Axios (with JWT interceptors in `lib/api/client.ts`)
- **Auth:** Supabase Auth (@supabase/supabase-js)
- **Validation:** Zod
- **Utilities:** clsx, tailwind-merge

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint checks
```

## Project Structure

```
app/
  (public)/            # Unauthenticated routes
    page.tsx           # Landing page
    jobs/page.tsx      # Public job listings
    login/page.tsx     # Login form
    signup/
      candidate/       # Candidate signup
      company/         # Company signup
  (authenticated)/     # Protected routes (to be built)
  admin/               # Admin panel (to be built)
  layout.tsx           # Root layout (Inter font)
  globals.css          # Tailwind directives + theme variables

lib/
  api/
    client.ts          # Axios instance with auth interceptors
    auth.ts            # Auth API endpoints
    jobs.ts            # Jobs API endpoints
  supabase/
    client.ts          # Supabase client (auth only)

docs/
  ARCHITECTURE.md      # System design, DB schema, API spec
  BACKEND-SETUP.md     # NestJS backend setup guide
  SPLIT-REPO-PLAN.md   # Repository architecture plan
```

Components, hooks, types, and utils directories are planned but not yet created.

## Architecture Principles

1. **API-first:** All data access through the backend API. Zero direct database queries from frontend.
2. **Job-centric access:** Companies see candidates only via job applications — no candidate browsing.
3. **Role-based (RBAC):** Three roles — candidate, company, admin. Permissions enforced at API level.
4. **Type-safe:** TypeScript interfaces for all API requests/responses. Zod for runtime validation.
5. **Reversible actions:** Withdraw applications, unpublish jobs, close listings — nothing is permanently destructive.
6. **GDPR-compliant by design:** Privacy-first data model.

## Key Patterns

- **Route groups:** `(public)` for unauthenticated, `(authenticated)` for protected routes
- **Interceptor pattern:** JWT auto-injected on requests, 401 redirects to login (`lib/api/client.ts`)
- **Immutable state:** React Query for caching, no global mutable state
- **Path alias:** `@/*` maps to project root (configured in `tsconfig.json`)

## Environment Variables

Required in `.env.local` (see `.env.local.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Backend API (Separate Repository)

The backend lives in `techfill-api` (NestJS). Key endpoints:

- `POST /auth/signup/{candidate|company}`, `POST /auth/login`, `GET /auth/me`
- `GET|PUT /candidates/profile`, `PATCH /candidates/visibility`
- `GET|PUT /companies/profile`
- `GET /jobs`, `GET /jobs/:id`, `POST /jobs`, `PUT /jobs/:id`
- `POST /jobs/:id/apply`, `GET /applications`, `DELETE /applications/:id`
- `GET /admin/{users|companies}`, `PATCH /admin/companies/:id/approve`

## Current Status

**Done:** Next.js setup, Tailwind, landing page, job listings, login/signup pages (UI only), API client structure, Supabase auth client, documentation.

**Not done:** Backend API, database, working auth flow, protected routes, form functionality, component library, custom hooks, testing, CI/CD.

## Testing (Not Yet Set Up)

No testing framework is installed yet. When added:

- Unit tests for utilities and components (80%+ coverage target)
- Integration tests for API communication
- E2E tests with Playwright for critical user flows
- TDD workflow: write tests first, then implement

## Deployment

- **Frontend:** Vercel (recommended)
- **Backend:** Railway / Render / Fly.io
- **Database + Auth + Storage:** Supabase

## Image Configuration

Next.js is configured to optimize images from Supabase Storage:
`**.supabase.co/storage/v1/object/public/**`
