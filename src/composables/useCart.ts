import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart.store';

export function useCart() {
  const cartStore = useCartStore();

  const { cart, loading, error, itemCount, total } = storeToRefs(cartStore);

  async function loadCart() {
    await cartStore.fetchCart();
  }

  async function addToCart(productId: string, quantity = 1) {
    await cartStore.addItem(productId, quantity);
  }

  async function removeFromCart(productId: string) {
    await cartStore.removeItem(productId);
  }

  async function updateCartItem(productId: string, quantity: number) {
    await cartStore.updateItem(productId, quantity);
  }

  async function clearCart() {
    await cartStore.clearCart();
  }

  return {
    cart,
    loading,
    error,
    itemCount,
    total,
    loadCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
  };
}
