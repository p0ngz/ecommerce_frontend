<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <h2 class="sidebar-title">Admin Panel</h2>
      <nav>
        <RouterLink to="/admin/products" class="sidebar-link">📦 Products</RouterLink>
        <RouterLink to="/admin/users" class="sidebar-link">👤 Users</RouterLink>
        <RouterLink to="/" class="sidebar-link">🏠 Back to Store</RouterLink>
      </nav>
    </aside>

    <main class="admin-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  gap: 0;
  min-height: calc(100vh - 60px);
  margin: -24px;
}
.admin-sidebar {
  width: 220px;
  background: #1f2937;
  color: white;
  padding: 24px 16px;
  flex-shrink: 0;
}
.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #f9fafb;
  padding: 0 8px;
}
.sidebar-link {
  display: block;
  padding: 10px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  transition: background 0.2s;
}
.sidebar-link:hover { background: #374151; color: white; }
.sidebar-link.router-link-active { background: #4f46e5; color: white; }
.admin-main { flex: 1; padding: 24px; overflow-x: auto; }
</style>
