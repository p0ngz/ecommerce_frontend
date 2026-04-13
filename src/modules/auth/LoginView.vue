<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

const { login, loading, error } = useAuth();

const form = ref({ email: '', password: '' });

async function handleSubmit() {
  await login(form.value);
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card card">
      <h1 class="auth-title">Welcome Back</h1>
      <p class="auth-subtitle">Sign in to your account</p>

      <p v-if="error" class="error-banner">{{ error }}</p>

      <form @submit.prevent="handleSubmit">
        <Input
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <Input
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />
        <Button type="submit" :loading="loading" class="w-full">Sign In</Button>
      </form>

      <p class="auth-footer">
        Don't have an account?
        <RouterLink to="/register">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 24px;
}
.auth-card {
  width: 100%;
  max-width: 420px;
}
.auth-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}
.auth-subtitle {
  color: #6b7280;
  margin-bottom: 24px;
}
.error-banner {
  background: #fee2e2;
  color: #991b1b;
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}
.w-full { width: 100%; }
.auth-footer {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #6b7280;
}
.auth-footer a { color: #4f46e5; text-decoration: none; font-weight: 500; }
</style>
