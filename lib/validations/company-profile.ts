import { z } from 'zod';

export const companyProfileSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  team_size: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']).optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
});

export type CompanyProfile = z.infer<typeof companyProfileSchema>;