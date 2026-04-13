import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product, CreateProductPayload, UpdateProductPayload, PaginatedResponse, PaginationQuery } from '@/types';
import { productService } from '@/services/product.service';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const currentProduct = ref<Product | null>(null);
  const pagination = ref({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProducts(query?: PaginationQuery & { isAdmin?: boolean }) {
    loading.value = true;
    error.value = null;
    try {
      const result: PaginatedResponse<Product> = await productService.getAll(query);
      products.value = result.items;
      pagination.value = {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      };
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to fetch products';
    } finally {
      loading.value = false;
    }
  }

  async function fetchProductById(id: string) {
    loading.value = true;
    error.value = null;
    try {
      currentProduct.value = await productService.getById(id);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to fetch product';
    } finally {
      loading.value = false;
    }
  }

  async function createProduct(payload: CreateProductPayload) {
    loading.value = true;
    error.value = null;
    try {
      const product = await productService.create(payload);
      products.value.unshift(product);
      return product;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to create product';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateProduct(id: string, payload: UpdateProductPayload) {
    loading.value = true;
    error.value = null;
    try {
      const updated = await productService.update(id, payload);
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) products.value[index] = updated;
      if (currentProduct.value?.id === id) currentProduct.value = updated;
      return updated;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to update product';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteProduct(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await productService.delete(id);
      products.value = products.value.filter((p) => p.id !== id);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to delete product';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    currentProduct,
    pagination,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
});
