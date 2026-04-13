import apiClient from '@/utils/axios';
import type { ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials } from '@/types';

export const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', credentials);
    return data.data!;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return data.data!;
  },

  async getMe(): Promise<AuthResponse['user']> {
    const { data } = await apiClient.get<ApiResponse<AuthResponse['user']>>('/auth/me');
    return data.data!;
  },
};
