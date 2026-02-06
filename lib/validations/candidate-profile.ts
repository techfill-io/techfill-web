import { z } from 'zod';

export const candidateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  location: z.string().optional(),
  headline: z.string().optional(),
  seniority: z.enum(['junior', 'mid', 'senior', 'lead', 'principal']).optional(),
  tech_stack: z.array(z.string()).default([]),
  employment_preference: z.string().optional(),
  remote_preference: z.enum(['remote', 'hybrid', 'onsite', 'flexible']).optional(),
  cv_url: z.string().url().optional().or(z.literal('')),
  is_visible: z.boolean().default(false),
});

export type CandidateProfile = z.infer<typeof candidateProfileSchema>;

// For form submission (without computed fields)
export const candidateProfileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().optional(),
  headline: z.string().optional(),
  seniority: z.enum(['junior', 'mid', 'senior', 'lead', 'principal']).optional(),
  tech_stack: z.array(z.string()),
  employment_preference: z.string().optional(),
  remote_preference: z.enum(['remote', 'hybrid', 'onsite', 'flexible']).optional(),
  cv_url: z.string().url().optional().or(z.literal('')),
  is_visible: z.boolean(),
});

export type CandidateProfileForm = z.infer<typeof candidateProfileFormSchema>;