import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/modules/product/ProductListView.vue'),
    meta: { title: 'Products' },
  },
  {
    path: '/products/:id',
    component: () => import('@/modules/product/ProductDetailView.vue'),
    meta: { title: 'Product Detail' },
  },
  {
    path: '/login',
    component: () => import('@/modules/auth/LoginView.vue'),
    meta: { title: 'Login', guestOnly: true },
  },
  {
    path: '/register',
    component: () => import('@/modules/auth/RegisterView.vue'),
    meta: { title: 'Register', guestOnly: true },
  },
  {
    path: '/cart',
    component: () => import('@/modules/cart/CartView.vue'),
    meta: { title: 'Cart', requiresAuth: true },
  },
  {
    path: '/admin',
    component: () => import('@/modules/admin/AdminDashboardView.vue'),
    meta: { title: 'Admin Dashboard', requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        redirect: '/admin/products',
      },
      {
        path: 'products',
        component: () => import('@/modules/admin/AdminProductsView.vue'),
        meta: { title: 'Manage Products', requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'users',
        component: () => import('@/modules/admin/AdminUsersView.vue'),
        meta: { title: 'Manage Users', requiresAuth: true, requiresAdmin: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/modules/common/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Update page title
  document.title = `${to.meta.title ?? 'E-Commerce'} | Vue Shop`;

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return next('/');
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next('/');
  }

  next();
});

export default router;
