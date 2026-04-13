import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Cart } from '@/types';
import { cartService } from '@/services/cart.service';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const itemCount = computed(() =>
    cart.value?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0
  );
  const total = computed(() => cart.value?.total ?? 0);

  async function fetchCart() {
    loading.value = true;
    error.value = null;
    try {
      cart.value = await cartService.getCart();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to fetch cart';
    } finally {
      loading.value = false;
    }
  }

  async function addItem(productId: string, quantity = 1) {
    loading.value = true;
    error.value = null;
    try {
      cart.value = await cartService.addItem(productId, quantity);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to add item';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function removeItem(productId: string) {
    loading.value = true;
    error.value = null;
    try {
      cart.value = await cartService.removeItem(productId);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to remove item';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateItem(productId: string, quantity: number) {
    loading.value = true;
    error.value = null;
    try {
      cart.value = await cartService.updateItem(productId, quantity);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Failed to update item';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function clearCart() {
    loading.value = true;
    try {
      await cartService.clearCart();
      cart.value = null;
    } finally {
      loading.value = false;
    }
  }

  return {
    cart,
    loading,
    error,
    itemCount,
    total,
    fetchCart,
    addItem,
    removeItem,
    updateItem,
    clearCart,
  };
});
