<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProduct } from '@/composables/useProduct';
import { useCart } from '@/composables/useCart';
import { useAuth } from '@/composables/useAuth';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import Button from '@/components/ui/Button.vue';

const route = useRoute();
const { currentProduct, loading, error, loadProductById } = useProduct();
const { addToCart } = useCart();
const { isAuthenticated } = useAuth();

const quantity = ref(1);
const adding = ref(false);
const addSuccess = ref(false);

async function handleAddToCart() {
  if (!isAuthenticated.value) {
    window.location.href = '/login';
    return;
  }
  adding.value = true;
  try {
    await addToCart(currentProduct.value!.id, quantity.value);
    addSuccess.value = true;
    setTimeout(() => (addSuccess.value = false), 2000);
  } finally {
    adding.value = false;
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price);
}

onMounted(() => {
  loadProductById(route.params.id as string);
});
</script>

<template>
  <div>
    <RouterLink to="/" class="back-link">← Back to Products</RouterLink>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="error-state">{{ error }}</div>

    <div v-else-if="currentProduct" class="product-detail">
      <div class="product-image-wrapper">
        <img
          :src="currentProduct.imageUrl || 'https://via.placeholder.com/500x400?text=No+Image'"
          :alt="currentProduct.name"
          class="product-image"
        />
      </div>

      <div class="product-info card">
        <span :class="['badge', currentProduct.isActive ? 'badge-success' : 'badge-error']">
          {{ currentProduct.isActive ? 'Available' : 'Unavailable' }}
        </span>
        <h1 class="product-name">{{ currentProduct.name }}</h1>
        <p class="product-description">{{ currentProduct.description || 'No description available.' }}</p>
        <div class="product-price">{{ formatPrice(currentProduct.price) }}</div>

        <div class="stock-info">
          <span class="stock-label">Stock:</span>
          <span :class="currentProduct.stock > 0 ? 'text-success' : 'text-danger'">
            {{ currentProduct.stock > 0 ? `${currentProduct.stock} units` : 'Out of stock' }}
          </span>
        </div>

        <div v-if="currentProduct.stock > 0" class="quantity-control">
          <label class="form-label">Quantity</label>
          <div class="qty-input">
            <button @click="quantity = Math.max(1, quantity - 1)">-</button>
            <input v-model.number="quantity" type="number" min="1" :max="currentProduct.stock" />
            <button @click="quantity = Math.min(currentProduct.stock, quantity + 1)">+</button>
          </div>
        </div>

        <div v-if="addSuccess" class="success-banner">✓ Added to cart!</div>

        <Button
          :disabled="currentProduct.stock === 0 || !currentProduct.isActive"
          :loading="adding"
          class="add-btn"
          @click="handleAddToCart"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
}
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
@media (max-width: 768px) {
  .product-detail { grid-template-columns: 1fr; }
}
.product-image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  max-height: 450px;
}
.product-info { display: flex; flex-direction: column; gap: 16px; }
.product-name { font-size: 28px; font-weight: 700; }
.product-description { color: #6b7280; line-height: 1.6; }
.product-price { font-size: 32px; font-weight: 700; color: #4f46e5; }
.stock-info { display: flex; gap: 8px; font-size: 14px; }
.stock-label { color: #6b7280; }
.text-success { color: #059669; }
.text-danger { color: #ef4444; }
.qty-input {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  width: fit-content;
}
.qty-input button {
  padding: 8px 14px;
  border: none;
  background: #f9fafb;
  cursor: pointer;
  font-size: 18px;
}
.qty-input button:hover { background: #f3f4f6; }
.qty-input input {
  width: 60px;
  text-align: center;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px 0;
}
.success-banner {
  background: #d1fae5;
  color: #065f46;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}
.add-btn { width: 100%; }
.error-state { text-align: center; padding: 60px; color: #ef4444; }
</style>
