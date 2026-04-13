<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProduct } from '@/composables/useProduct';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import Modal from '@/components/ui/Modal.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import type { Product, CreateProductPayload } from '@/types';

const { products, pagination, loading, error, loadProducts, createProduct, updateProduct, deleteProduct } = useProduct();

const showModal = ref(false);
const editingProduct = ref<Product | null>(null);
const formLoading = ref(false);
const search = ref('');

const form = ref<CreateProductPayload>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  imageUrl: '',
  isActive: true,
});

function openCreate() {
  editingProduct.value = null;
  form.value = { name: '', description: '', price: 0, stock: 0, imageUrl: '', isActive: true };
  showModal.value = true;
}

function openEdit(product: Product) {
  editingProduct.value = product;
  form.value = {
    name: product.name,
    description: product.description || '',
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl || '',
    isActive: product.isActive,
  };
  showModal.value = true;
}

async function handleSave() {
  formLoading.value = true;
  try {
    if (editingProduct.value) {
      await updateProduct(editingProduct.value.id, form.value);
    } else {
      await createProduct(form.value);
    }
    showModal.value = false;
    loadProducts({ isAdmin: true });
  } finally {
    formLoading.value = false;
  }
}

async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  await deleteProduct(id);
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price);
}

onMounted(() => loadProducts({ isAdmin: true }));
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Manage Products</h1>
      <Button size="sm" @click="openCreate">+ Add Product</Button>
    </div>

    <div class="filter-bar">
      <input
        v-model="search"
        type="text"
        placeholder="Search products..."
        class="form-input search-input"
        @keyup.enter="loadProducts({ isAdmin: true, search: search || undefined })"
      />
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="error-state">{{ error }}</div>

    <div v-else>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <div class="product-cell">
                  <img
                    :src="product.imageUrl || 'https://via.placeholder.com/40x40?text=?'"
                    alt=""
                    class="table-img"
                  />
                  {{ product.name }}
                </div>
              </td>
              <td>{{ formatPrice(product.price) }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <span :class="['badge', product.isActive ? 'badge-success' : 'badge-error']">
                  {{ product.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <div class="action-btns">
                  <Button size="sm" variant="secondary" @click="openEdit(product)">Edit</Button>
                  <Button size="sm" variant="danger" @click="handleDelete(product.id)">Delete</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        Total: {{ pagination.total }} products
      </div>
    </div>

    <Modal :show="showModal" :title="editingProduct ? 'Edit Product' : 'Add Product'" @close="showModal = false">
      <form @submit.prevent="handleSave">
        <Input v-model="form.name" label="Name" required />
        <Input v-model="form.description" label="Description" />
        <Input v-model.number="form.price" label="Price (THB)" type="number" required />
        <Input v-model.number="form.stock" label="Stock" type="number" required />
        <Input v-model="form.imageUrl" label="Image URL" />
        <div class="form-group">
          <label class="form-label">
            <input v-model="form.isActive" type="checkbox" />
            Active
          </label>
        </div>
      </form>

      <template #footer>
        <Button variant="secondary" @click="showModal = false">Cancel</Button>
        <Button :loading="formLoading" @click="handleSave">
          {{ editingProduct ? 'Update' : 'Create' }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h1 { font-size: 22px; font-weight: 700; }
.filter-bar { margin-bottom: 16px; }
.search-input { max-width: 320px; }
.table-wrapper { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.data-table th { background: #f9fafb; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
.data-table td { padding: 14px 16px; border-top: 1px solid #f3f4f6; font-size: 14px; vertical-align: middle; }
.product-cell { display: flex; align-items: center; gap: 10px; }
.table-img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; }
.action-btns { display: flex; gap: 8px; }
.table-footer { margin-top: 12px; font-size: 13px; color: #6b7280; text-align: right; }
.error-state { text-align: center; padding: 60px; color: #ef4444; }
</style>
