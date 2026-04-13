<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    :class="['btn', `btn-${variant || 'primary'}`, size ? `btn-${size}` : '']"
  >
    <span v-if="loading" class="spinner" />
    <slot />
  </button>
</template>

<style scoped>
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-right: 6px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
