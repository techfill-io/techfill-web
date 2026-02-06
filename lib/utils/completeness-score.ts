import type { CandidateProfile } from '@/lib/validations/candidate-profile';

export function calculateCompletenessScore(profile: Partial<CandidateProfile>): number {
  const fields = {
    name: profile.name ? 10 : 0,
    email: profile.email ? 10 : 0,
    location: profile.location ? 10 : 0,
    headline: profile.headline ? 15 : 0,
    seniority: profile.seniority ? 10 : 0,
    tech_stack: profile.tech_stack && profile.tech_stack.length > 0 ? 15 : 0,
    employment_preference: profile.employment_preference ? 10 : 0,
    remote_preference: profile.remote_preference ? 10 : 0,
    cv_url: profile.cv_url ? 20 : 0,
  };

  return Object.values(fields).reduce((sum, score) => sum + score, 0);
}

export function getProfileCompletionTasks(profile: Partial<CandidateProfile>) {
  const tasks = [];
  
  if (!profile.name) tasks.push('Add your full name');
  if (!profile.location) tasks.push('Add your location');
  if (!profile.headline) tasks.push('Write a professional headline');
  if (!profile.seniority) tasks.push('Select your seniority level');
  if (!profile.tech_stack || profile.tech_stack.length === 0) {
    tasks.push('Add your tech stack');
  }
  if (!profile.employment_preference) tasks.push('Set employment preference');
  if (!profile.remote_preference) tasks.push('Set remote work preference');
  if (!profile.cv_url) tasks.push('Upload your CV/Resume');

  return tasks;
}