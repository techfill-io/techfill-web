import apiClient from './client';

export interface User {
  id: string;
  email: string;
  role: 'candidate' | 'company' | 'admin';
  created_at: string;
}

export interface SignupCandidateDto {
  email: string;
  password: string;
  name: string;
}

export interface SignupCompanyDto {
  email: string;
  password: string;
  company_name: string;
  contact_name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  // Sign up as candidate
  signupCandidate: async (data: SignupCandidateDto) => {
    const response = await apiClient.post<AuthResponse>('/auth/signup/candidate', data);
    return response.data;
  },

  // Sign up as company
  signupCompany: async (data: SignupCompanyDto) => {
    const response = await apiClient.post<AuthResponse>('/auth/signup/company', data);
    return response.data;
  },

  // Login
  login: async (data: LoginDto) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  // Logout
  logout: async () => {
    await apiClient.post('/auth/logout');
  },

  // Get current user
  me: async () => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};
