<script setup lang="ts">
defineProps<{ size?: 'sm' | 'md' | 'lg' }>();
</script>

<template>
  <div :class="['spinner-wrapper', size || 'md']">
    <div class="spinner" />
  </div>
</template>

<style scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.spinner {
  border-radius: 50%;
  border: 3px solid #e5e7eb;
  border-top-color: #4f46e5;
  animation: spin 0.7s linear infinite;
}
.sm .spinner { width: 20px; height: 20px; }
.md .spinner { width: 36px; height: 36px; }
.lg .spinner { width: 56px; height: 56px; border-width: 4px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
