# Backend API Setup Guide

This guide will help you set up the NestJS backend API in a separate repository.

## Quick Start

### 1. Create the Backend Repository

```bash
cd /Users/petemihaylov/Desktop/git
mkdir techfillio-api
cd techfillio-api
```

### 2. Initialize NestJS Project

```bash
# Create new NestJS app (choose npm when asked)
npx @nestjs/cli new . --package-manager npm --skip-git

# Install core dependencies
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @supabase/supabase-js
npm install class-validator class-transformer
npm install @nestjs/config

# Install dev dependencies
npm install -D @types/passport-jwt
```

### 3. Project Structure

Create the following folder structure:

```bash
mkdir -p src/{auth,users,candidates,companies,jobs,applications,storage,admin,common,database}
mkdir -p src/auth/{guards,decorators,strategies,dto}
mkdir -p src/common/{filters,interceptors,pipes,types}
mkdir -p supabase/migrations
```

## Environment Variables

Create `.env` file in the root:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

# Database (Direct connection - optional)
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-change-this
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,https://techfillio.com

# Storage
STORAGE_BUCKET_CVS=cvs
STORAGE_BUCKET_LOGOS=company-logos
```

## Core Files

### 1. Main Configuration (`src/main.ts`)

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
}
bootstrap();
```

### 2. App Module (`src/app.module.ts`)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CandidatesModule } from './candidates/candidates.module';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { StorageModule } from './storage/storage.module';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CandidatesModule,
    CompaniesModule,
    JobsModule,
    ApplicationsModule,
    StorageModule,
    AdminModule,
  ],
})
export class AppModule {}
```

### 3. Supabase Client (`src/database/supabase.client.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseClient {
  private client;

  constructor(private configService: ConfigService) {
    this.client = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }

  get supabase() {
    return this.client;
  }

  // Auth methods
  async verifyToken(token: string) {
    const { data, error } = await this.client.auth.getUser(token);
    if (error) throw error;
    return data.user;
  }

  // Storage methods
  async uploadFile(bucket: string, path: string, file: Buffer) {
    const { data, error } = await this.client.storage
      .from(bucket)
      .upload(path, file);
    if (error) throw error;
    return data;
  }

  async getPublicUrl(bucket: string, path: string) {
    const { data } = this.client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async deleteFile(bucket: string, path: string) {
    const { error } = await this.client.storage.from(bucket).remove([path]);
    if (error) throw error;
  }
}
```

### 4. Database Module (`src/database/database.module.ts`)

```typescript
import { Module, Global } from '@nestjs/common';
import { SupabaseClient } from './supabase.client';

@Global()
@Module({
  providers: [SupabaseClient],
  exports: [SupabaseClient],
})
export class DatabaseModule {}
```

### 5. JWT Strategy (`src/auth/strategies/jwt.strategy.ts`)

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '../../database/supabase.client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private supabase: SupabaseClient,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SUPABASE_JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Verify token with Supabase
    try {
      const user = await this.supabase.verifyToken(payload.sub);
      return { id: user.id, email: user.email };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
```

### 6. Auth Guards (`src/auth/guards/jwt-auth.guard.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### 7. Roles Guard (`src/auth/guards/roles.guard.ts`)

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // TODO: Fetch user role from database
    // For now, assume user has role property
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### 8. Roles Decorator (`src/auth/decorators/roles.decorator.ts`)

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

### 9. Current User Decorator (`src/auth/decorators/current-user.decorator.ts`)

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

### 10. Auth Module (`src/auth/auth.module.ts`)

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

### 11. Auth Controller (`src/auth/auth.controller.ts`)

```typescript
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup/candidate')
  async signupCandidate(@Body() dto: any) {
    return this.authService.signupCandidate(dto);
  }

  @Post('signup/company')
  async signupCompany(@Body() dto: any) {
    return this.authService.signupCompany(dto);
  }

  @Post('login')
  async login(@Body() dto: any) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: any) {
    return this.authService.getUserProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return { message: 'Logged out successfully' };
  }
}
```

### 12. Auth Service (`src/auth/auth.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../database/supabase.client';

@Injectable()
export class AuthService {
  constructor(private supabase: SupabaseClient) {}

  async signupCandidate(dto: any) {
    // TODO: Implement candidate signup
    // 1. Create user in Supabase Auth
    // 2. Create profile with role='candidate'
    // 3. Create candidate_profile
    return { message: 'Candidate signup - to be implemented' };
  }

  async signupCompany(dto: any) {
    // TODO: Implement company signup
    return { message: 'Company signup - to be implemented' };
  }

  async login(dto: any) {
    // TODO: Implement login
    return { message: 'Login - to be implemented' };
  }

  async getUserProfile(userId: string) {
    // TODO: Fetch user profile from database
    return { message: 'Get user profile - to be implemented' };
  }
}
```

## Database Migrations

### Create Initial Schema (`supabase/migrations/20240101000000_initial_schema.sql`)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('candidate', 'company', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

### Candidate Profiles (`supabase/migrations/20240101000001_create_candidate_profiles.sql`)

```sql
CREATE TABLE candidate_profiles (
  user_id UUID PRIMARY KEY REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT,
  headline TEXT,
  seniority TEXT CHECK (seniority IN ('junior', 'mid', 'senior', 'lead', 'principal')),
  tech_stack TEXT[] DEFAULT '{}',
  employment_preference TEXT,
  remote_preference TEXT,
  cv_url TEXT,
  is_visible BOOLEAN DEFAULT FALSE,
  completeness_score INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_candidate_visible ON candidate_profiles(is_visible) WHERE is_visible = TRUE;
CREATE INDEX idx_candidate_tech_stack ON candidate_profiles USING GIN(tech_stack);

ALTER TABLE candidate_profiles ENABLE ROW LEVEL SECURITY;
```

### Companies (`supabase/migrations/20240101000002_create_companies.sql`)

```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  industry TEXT,
  team_size TEXT,
  location TEXT,
  website TEXT,
  logo_url TEXT,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(owner_user_id)
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
```

### Jobs (`supabase/migrations/20240101000003_create_jobs.sql`)

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
```

### Applications (`supabase/migrations/20240101000004_create_applications.sql`)

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied' CHECK (
    status IN ('applied', 'reviewed', 'interview', 'rejected', 'hired', 'withdrawn')
  ),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, candidate_id)
);

CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_status ON applications(status);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
```

## Running Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Testing the API

### 1. Start the server

```bash
npm run start:dev
```

### 2. Test health check

```bash
curl http://localhost:3001/api
```

### 3. Test auth endpoints (once implemented)

```bash
# Signup candidate
curl -X POST http://localhost:3001/api/auth/signup/candidate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@example.com",
    "password": "password123",
    "name": "John Doe"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@example.com",
    "password": "password123"
  }'
```

## Next Steps

1. Implement remaining modules:
   - Users
   - Candidates
   - Companies
   - Jobs
   - Applications
   - Storage
   - Admin

2. Add proper DTOs with class-validator

3. Implement business logic in services

4. Add unit tests

5. Add e2e tests

6. Set up CI/CD

## Deployment

See [SPLIT-REPO-PLAN.md](./SPLIT-REPO-PLAN.md#deployment) for deployment instructions.

## Related Files

- Frontend repository: `/Users/petemihaylov/Desktop/git/techfillio`
- Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Split Repo Plan: [SPLIT-REPO-PLAN.md](./SPLIT-REPO-PLAN.md)
