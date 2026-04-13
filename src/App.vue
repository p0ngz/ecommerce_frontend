<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue';
</script>

<template>
  <div id="app-layout">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}
.btn-primary:hover { background-color: #4338ca; }
.btn-primary:disabled { background-color: #a5b4fc; cursor: not-allowed; }

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}
.btn-secondary:hover { background-color: #d1d5db; }

.btn-danger {
  background-color: #ef4444;
  color: white;
}
.btn-danger:hover { background-color: #dc2626; }

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.error-text {
  color: #ef4444;
  font-size: 13px;
  margin-top: 4px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
}

.badge-success { background: #d1fae5; color: #065f46; }
.badge-error { background: #fee2e2; color: #991b1b; }
.badge-info { background: #dbeafe; color: #1e40af; }
</style>
