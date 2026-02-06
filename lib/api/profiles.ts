import apiClient from './client';
import type { CandidateProfile, CandidateProfileForm } from '@/lib/validations/candidate-profile';

export interface CandidateProfileWithCompletion extends CandidateProfile {
  completeness_score: number;
}

export const profileApi = {
  // Get current user's candidate profile
  getCandidateProfile: async (): Promise<CandidateProfileWithCompletion> => {
    const response = await apiClient.get<CandidateProfileWithCompletion>('/profiles/candidate/me');
    return response.data;
  },

  // Create candidate profile
  createCandidateProfile: async (data: CandidateProfileForm): Promise<CandidateProfileWithCompletion> => {
    const response = await apiClient.post<CandidateProfileWithCompletion>('/profiles/candidate', data);
    return response.data;
  },

  // Update candidate profile
  updateCandidateProfile: async (data: CandidateProfileForm): Promise<CandidateProfileWithCompletion> => {
    const response = await apiClient.put<CandidateProfileWithCompletion>('/profiles/candidate', data);
    return response.data;
  },

  // Delete candidate profile
  deleteCandidateProfile: async (): Promise<void> => {
    await apiClient.delete('/profiles/candidate');
  },

  // Toggle profile visibility
  toggleProfileVisibility: async (isVisible: boolean): Promise<CandidateProfileWithCompletion> => {
    const response = await apiClient.patch<CandidateProfileWithCompletion>('/profiles/candidate/visibility', {
      is_visible: isVisible
    });
    return response.data;
  },
};