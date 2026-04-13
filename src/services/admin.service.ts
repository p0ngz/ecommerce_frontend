import apiClient from '@/utils/axios';
import type { ApiResponse, PaginatedResponse, PaginationQuery, User } from '@/types';

export const adminService = {
  async getUsers(query?: PaginationQuery): Promise<PaginatedResponse<User>> {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/admin/users', {
      params: query,
    });
    return data.data!;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`);
  },
};
