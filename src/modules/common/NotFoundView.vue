<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="not-found">
    <h1 class="code">404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <RouterLink to="/" class="btn btn-primary">Go Home</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 24px;
}
.code {
  font-size: 80px;
  font-weight: 800;
  color: #4f46e5;
  line-height: 1;
  margin-bottom: 8px;
}
h2 { font-size: 24px; margin-bottom: 8px; }
p { color: #6b7280; margin-bottom: 24px; }
</style>
