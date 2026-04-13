<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProduct } from '@/composables/useProduct';
import { useCart } from '@/composables/useCart';
import { useAuth } from '@/composables/useAuth';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import Button from '@/components/ui/Button.vue';

const { products, pagination, loading, error, loadProducts } = useProduct();
const { addToCart } = useCart();
const { isAuthenticated } = useAuth();

const search = ref('');
const currentPage = ref(1);
const addingToCart = ref<string | null>(null);

async function fetchProducts() {
  await loadProducts({ page: currentPage.value, limit: 8, search: search.value || undefined });
}

async function handleAddToCart(productId: string) {
  if (!isAuthenticated.value) {
    window.location.href = '/login';
    return;
  }
  addingToCart.value = productId;
  try {
    await addToCart(productId, 1);
  } finally {
    addingToCart.value = null;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchProducts();
}

function goToPage(page: number) {
  currentPage.value = page;
  fetchProducts();
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price);
}

onMounted(fetchProducts);
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Products</h1>
      <div class="search-bar">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="form-input search-input"
          @keyup.enter="handleSearch"
        />
        <Button size="sm" @click="handleSearch">Search</Button>
      </div>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="error-state">{{ error }}</div>

    <div v-else-if="products.length === 0" class="empty-state">
      No products found.
    </div>

    <div v-else>
      <div class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card card">
          <RouterLink :to="`/products/${product.id}`">
            <img
              :src="product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'"
              :alt="product.name"
              class="product-image"
            />
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description || 'No description' }}</p>
              <div class="product-footer">
                <span class="product-price">{{ formatPrice(product.price) }}</span>
                <span :class="['badge', product.stock > 0 ? 'badge-success' : 'badge-error']">
                  {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                </span>
              </div>
            </div>
          </RouterLink>

          <div class="product-actions">
            <Button
              size="sm"
              :disabled="product.stock === 0 || addingToCart === product.id"
              :loading="addingToCart === product.id"
              class="add-btn"
              @click="handleAddToCart(product.id)"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="pagination">
        <button
          v-for="page in pagination.totalPages"
          :key="page"
          :class="['page-btn', { active: page === currentPage }]"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.page-header h1 { font-size: 28px; font-weight: 700; }
.search-bar { display: flex; gap: 8px; }
.search-input { width: 280px; margin-bottom: 0; }
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.product-card { padding: 0; overflow: hidden; }
.product-card a { text-decoration: none; color: inherit; }
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.product-info { padding: 16px; }
.product-name { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
.product-description {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-price { font-size: 18px; font-weight: 700; color: #4f46e5; }
.product-actions { padding: 12px 16px; border-top: 1px solid #f3f4f6; }
.add-btn { width: 100%; }
.empty-state, .error-state {
  text-align: center;
  padding: 60px;
  color: #6b7280;
}
.error-state { color: #ef4444; }
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}
.page-btn {
  padding: 8px 14px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.page-btn.active {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}
</style>
