import apiClient from './client';

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
  updated_at: string;
  company?: {
    id: string;
    name: string;
    logo_url?: string;
  };
}

export interface JobFilters {
  seniority?: string;
  tech_stack?: string[];
  location?: string;
  is_remote?: boolean;
  status?: 'draft' | 'active' | 'closed';
}

export interface CreateJobDto {
  title: string;
  description: string;
  seniority: string;
  tech_stack: string[];
  location: string;
  is_remote: boolean;
}

export interface UpdateJobDto extends Partial<CreateJobDto> {
  status?: 'draft' | 'active' | 'closed';
}

export const jobsApi = {
  // Public - Get all active jobs with filters
  getAll: async (filters?: JobFilters) => {
    const response = await apiClient.get<Job[]>('/jobs', { params: filters });
    return response.data;
  },

  // Public - Get single job by ID
  getById: async (id: string) => {
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  // Protected - Company only
  create: async (data: CreateJobDto) => {
    const response = await apiClient.post<Job>('/jobs', data);
    return response.data;
  },

  // Protected - Company owner only
  update: async (id: string, data: UpdateJobDto) => {
    const response = await apiClient.put<Job>(`/jobs/${id}`, data);
    return response.data;
  },

  // Protected - Company owner only
  delete: async (id: string) => {
    await apiClient.delete(`/jobs/${id}`);
  },

  // Protected - Company owner only
  updateStatus: async (id: string, status: 'draft' | 'active' | 'closed') => {
    const response = await apiClient.patch<Job>(`/jobs/${id}/status`, { status });
    return response.data;
  },
};
