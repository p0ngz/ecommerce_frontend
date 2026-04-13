import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';
import { authService } from '@/services/auth.service';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');

  // Actions
  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);
  }

  function clearAuth() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
  }

  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = null;
    try {
      const result = await authService.login(credentials);
      user.value = result.user;
      setToken(result.token);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function register(credentials: RegisterCredentials) {
    loading.value = true;
    error.value = null;
    try {
      const result = await authService.register(credentials);
      user.value = result.user;
      setToken(result.token);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message || 'Registration failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchMe() {
    if (!token.value) return;
    try {
      user.value = await authService.getMe();
    } catch {
      clearAuth();
    }
  }

  function logout() {
    clearAuth();
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    fetchMe,
  };
});
