import apiClient from '@/utils/axios';
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationQuery,
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from '@/types';

export const productService = {
  async getAll(query?: PaginationQuery & { isAdmin?: boolean }): Promise<PaginatedResponse<Product>> {
    const params = { ...query };
    const endpoint = query?.isAdmin ? '/admin/products' : '/products';
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(endpoint, { params });
    return data.data!;
  },

  async getById(id: string): Promise<Product> {
    const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data!;
  },

  async create(payload: CreateProductPayload): Promise<Product> {
    const { data } = await apiClient.post<ApiResponse<Product>>('/products', payload);
    return data.data!;
  },

  async update(id: string, payload: UpdateProductPayload): Promise<Product> {
    const { data } = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, payload);
    return data.data!;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },
};
