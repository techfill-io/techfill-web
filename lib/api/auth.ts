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
  remember_me?: boolean;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  access_token: string;
}

export interface SetPasswordDto {
  password: string;
}

export interface GoogleSyncDto {
  role: 'candidate' | 'company';
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  remember_me: boolean;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface GoogleSyncResponse {
  is_new_user: boolean;
  user: {
    id: string;
    email?: string;
    role: string;
    has_password: boolean;
    auth_provider: string;
  };
  profile_complete: boolean;
}

export interface MeResponse {
  id: string;
  role: 'candidate' | 'company' | 'admin';
  auth_provider: string;
  has_password: boolean;
  profile_complete: boolean;
  profile: Record<string, unknown> | null;
  created_at: string;
}

// All responses are wrapped in { success: true, data: ... } by the API
function unwrap<T>(response: { data: { success: boolean; data: T } }): T {
  return response.data.data;
}

export const authApi = {
  signupCandidate: async (data: SignupCandidateDto): Promise<SignupResponse> => {
    const response = await apiClient.post('/api/auth/signup/candidate', data);
    return unwrap(response);
  },

  signupCompany: async (data: SignupCompanyDto): Promise<SignupResponse> => {
    const response = await apiClient.post('/api/auth/signup/company', data);
    return unwrap(response);
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/login', data);
    return unwrap(response);
  },

  forgotPassword: async (data: ForgotPasswordDto): Promise<{ message: string }> => {
    const response = await apiClient.post('/api/auth/forgot-password', data);
    return unwrap(response);
  },

  resetPassword: async (data: ResetPasswordDto): Promise<{ message: string }> => {
    const response = await apiClient.post('/api/auth/reset-password', data);
    return unwrap(response);
  },

  googleSync: async (data: GoogleSyncDto): Promise<GoogleSyncResponse> => {
    const response = await apiClient.post('/api/auth/google/sync', data);
    return unwrap(response);
  },

  setPassword: async (data: SetPasswordDto): Promise<{ message: string }> => {
    const response = await apiClient.post('/api/auth/set-password', data);
    return unwrap(response);
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/api/auth/logout');
  },

  me: async (): Promise<MeResponse> => {
    const response = await apiClient.get('/api/auth/me');
    return unwrap(response);
  },
};
