<script setup lang="ts">
import { onMounted } from 'vue';
import { useCart } from '@/composables/useCart';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import Button from '@/components/ui/Button.vue';

const { cart, loading, error, total, loadCart, removeFromCart, updateCartItem, clearCart } = useCart();

function formatPrice(price: number) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price);
}

async function handleQtyChange(productId: string, qty: number) {
  await updateCartItem(productId, qty);
}

onMounted(loadCart);
</script>

<template>
  <div>
    <h1 class="page-title">Shopping Cart</h1>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="error-state">{{ error }}</div>

    <div v-else-if="!cart || cart.items.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Add some products to get started!</p>
      <RouterLink to="/" class="btn btn-primary">Browse Products</RouterLink>
    </div>

    <div v-else class="cart-layout">
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item.id" class="cart-item card">
          <img
            :src="item.product.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'"
            :alt="item.product.name"
            class="item-image"
          />

          <div class="item-info">
            <RouterLink :to="`/products/${item.productId}`" class="item-name">
              {{ item.product.name }}
            </RouterLink>
            <span class="item-price">{{ formatPrice(Number(item.product.price)) }}</span>
          </div>

          <div class="item-qty">
            <button @click="handleQtyChange(item.productId, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="handleQtyChange(item.productId, item.quantity + 1)">+</button>
          </div>

          <div class="item-subtotal">
            {{ formatPrice(Number(item.product.price) * item.quantity) }}
          </div>

          <button class="remove-btn" @click="removeFromCart(item.productId)">✕</button>
        </div>
      </div>

      <div class="cart-summary card">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Items ({{ cart.items.length }})</span>
          <span>{{ formatPrice(total) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span class="text-success">Free</span>
        </div>
        <div class="summary-divider" />
        <div class="summary-total">
          <span>Total</span>
          <span>{{ formatPrice(total) }}</span>
        </div>
        <Button class="checkout-btn">Proceed to Checkout</Button>
        <Button variant="secondary" class="clear-btn" @click="clearCart">Clear Cart</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-title { font-size: 28px; font-weight: 700; margin-bottom: 24px; }
.cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
@media (max-width: 768px) { .cart-layout { grid-template-columns: 1fr; } }
.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  padding: 16px;
}
.item-image { width: 80px; height: 80px; object-fit: cover; border-radius: 6px; }
.item-info { flex: 1; }
.item-name {
  display: block;
  font-weight: 600;
  text-decoration: none;
  color: #111;
  margin-bottom: 4px;
}
.item-name:hover { color: #4f46e5; }
.item-price { color: #6b7280; font-size: 14px; }
.item-qty {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 4px 10px;
}
.item-qty button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #6b7280;
  padding: 0;
}
.item-qty button:hover { color: #111; }
.item-qty span { width: 24px; text-align: center; }
.item-subtotal { font-weight: 600; min-width: 100px; text-align: right; }
.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 16px;
}
.remove-btn:hover { color: #ef4444; }
.cart-summary { display: flex; flex-direction: column; gap: 14px; height: fit-content; }
.cart-summary h2 { font-size: 18px; font-weight: 600; }
.summary-row { display: flex; justify-content: space-between; font-size: 14px; }
.summary-divider { border-top: 1px solid #e5e7eb; margin: 4px 0; }
.summary-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; }
.text-success { color: #059669; }
.checkout-btn { width: 100%; }
.clear-btn { width: 100%; }
.empty-cart {
  text-align: center;
  padding: 80px 24px;
}
.empty-icon { font-size: 60px; margin-bottom: 16px; }
.empty-cart h2 { font-size: 22px; margin-bottom: 8px; }
.empty-cart p { color: #6b7280; margin-bottom: 24px; }
.error-state { text-align: center; padding: 60px; color: #ef4444; }
</style>
