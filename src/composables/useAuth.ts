import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import type { LoginCredentials, RegisterCredentials } from '@/types';

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  const { user, token, loading, error, isAuthenticated, isAdmin } = storeToRefs(authStore);

  async function login(credentials: LoginCredentials) {
    await authStore.login(credentials);
    if (authStore.isAdmin) {
      await router.push('/admin');
    } else {
      await router.push('/');
    }
  }

  async function register(credentials: RegisterCredentials) {
    await authStore.register(credentials);
    await router.push('/');
  }

  function logout() {
    authStore.logout();
    router.push('/login');
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
  };
}
