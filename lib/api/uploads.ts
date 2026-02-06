import apiClient from './client';

export interface UploadResponse {
  url: string;
  publicUrl?: string;
}

export const uploadsApi = {
  // Upload CV file
  uploadCV: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<UploadResponse>('/uploads/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload company logo
  uploadCompanyLogo: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<UploadResponse>('/uploads/company-logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete file
  deleteFile: async (url: string): Promise<void> => {
    await apiClient.delete('/uploads/file', {
      data: { url }
    });
  },
};