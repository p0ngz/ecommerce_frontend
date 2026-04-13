import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product.store';
import type { CreateProductPayload, UpdateProductPayload, PaginationQuery } from '@/types';

export function useProduct() {
  const productStore = useProductStore();

  const { products, currentProduct, pagination, loading, error } = storeToRefs(productStore);

  async function loadProducts(query?: PaginationQuery & { isAdmin?: boolean }) {
    await productStore.fetchProducts(query);
  }

  async function loadProductById(id: string) {
    await productStore.fetchProductById(id);
  }

  async function createProduct(payload: CreateProductPayload) {
    return productStore.createProduct(payload);
  }

  async function updateProduct(id: string, payload: UpdateProductPayload) {
    return productStore.updateProduct(id, payload);
  }

  async function deleteProduct(id: string) {
    return productStore.deleteProduct(id);
  }

  return {
    products,
    currentProduct,
    pagination,
    loading,
    error,
    loadProducts,
    loadProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
