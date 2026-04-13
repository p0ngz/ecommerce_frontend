<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { adminService } from '@/services/admin.service';
import Button from '@/components/ui/Button.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import type { User, PaginatedResponse } from '@/types';

const users = ref<User[]>([]);
const pagination = ref({ total: 0, page: 1, limit: 10, totalPages: 0 });
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchUsers(page = 1) {
  loading.value = true;
  error.value = null;
  try {
    const result: PaginatedResponse<User> = await adminService.getUsers({ page, limit: 10 });
    users.value = result.items;
    pagination.value = { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages };
  } catch {
    error.value = 'Failed to load users';
  } finally {
    loading.value = false;
  }
}

async function handleDelete(id: string) {
  if (!confirm('Delete this user? This action cannot be undone.')) return;
  try {
    await adminService.deleteUser(id);
    await fetchUsers(pagination.value.page);
  } catch {
    alert('Failed to delete user');
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('th-TH');
}

onMounted(() => fetchUsers());
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Manage Users</h1>
      <span class="user-count">{{ pagination.total }} total users</span>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="error-state">{{ error }}</div>

    <div v-else>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['badge', user.role === 'ADMIN' ? 'badge-info' : 'badge-success']">
                  {{ user.role }}
                </span>
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  :disabled="user.role === 'ADMIN'"
                  @click="handleDelete(user.id)"
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="pagination.totalPages > 1" class="pagination">
        <button
          v-for="page in pagination.totalPages"
          :key="page"
          :class="['page-btn', { active: page === pagination.page }]"
          @click="fetchUsers(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h1 { font-size: 22px; font-weight: 700; }
.user-count { font-size: 14px; color: #6b7280; }
.table-wrapper { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.data-table th { background: #f9fafb; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
.data-table td { padding: 14px 16px; border-top: 1px solid #f3f4f6; font-size: 14px; }
.error-state { text-align: center; padding: 60px; color: #ef4444; }
.pagination { display: flex; justify-content: center; gap: 8px; margin-top: 20px; }
.page-btn { padding: 8px 14px; border: 1px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer; }
.page-btn.active { background: #4f46e5; color: white; border-color: #4f46e5; }
</style>
