<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useCart } from '@/composables/useCart';
import { RouterLink } from 'vue-router';

const { user, isAuthenticated, isAdmin, logout } = useAuth();
const { itemCount } = useCart();
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="brand">🛒 Vue Shop</RouterLink>

      <div class="nav-links">
        <RouterLink to="/">Products</RouterLink>

        <template v-if="isAuthenticated">
          <RouterLink to="/cart" class="cart-link">
            Cart
            <span v-if="itemCount > 0" class="cart-badge">{{ itemCount }}</span>
          </RouterLink>

          <RouterLink v-if="isAdmin" to="/admin/products">Admin</RouterLink>

          <span class="user-name">{{ user?.name }}</span>
          <button class="btn btn-secondary btn-sm" @click="logout">Logout</button>
        </template>

        <template v-else>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register" class="btn btn-primary btn-sm">Register</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  font-size: 20px;
  font-weight: 700;
  color: #4f46e5;
  text-decoration: none;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}
.nav-links a {
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
}
.nav-links a:hover { color: #4f46e5; }
.nav-links a.router-link-active { color: #4f46e5; }
.cart-link { position: relative; }
.cart-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: #ef4444;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-name {
  font-size: 14px;
  color: #6b7280;
}
</style>
