import axios from 'axios';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token and API version
apiClient.interceptors.request.use(
  async (config) => {
    // Add API version prefix if path starts with /api and doesn't already have version
    if (config.url?.startsWith('/api') && !config.url.match(/^\/api\/v\d+/)) {
      config.url = config.url.replace('/api', '/api/v1');
    }

    const {
      data: { session },
    } = await getSupabaseBrowserClient().auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
// Note: We don't auto-redirect on 401 here - let the middleware handle auth redirects
// to avoid redirect loops when the auth state is being established
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
