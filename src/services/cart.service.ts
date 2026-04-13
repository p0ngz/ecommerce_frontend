import apiClient from '@/utils/axios';
import type { ApiResponse, Cart } from '@/types';

export const cartService = {
  async getCart(): Promise<Cart> {
    const { data } = await apiClient.get<ApiResponse<Cart>>('/cart');
    return data.data!;
  },

  async addItem(productId: string, quantity = 1): Promise<Cart> {
    const { data } = await apiClient.post<ApiResponse<Cart>>('/cart/add', { productId, quantity });
    return data.data!;
  },

  async removeItem(productId: string): Promise<Cart> {
    const { data } = await apiClient.post<ApiResponse<Cart>>('/cart/remove', { productId });
    return data.data!;
  },

  async updateItem(productId: string, quantity: number): Promise<Cart> {
    const { data } = await apiClient.put<ApiResponse<Cart>>('/cart/update', { productId, quantity });
    return data.data!;
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/cart/clear');
  },
};
