import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/found',
    name: 'found',
    component: () => import('@/views/FoundView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/OrderView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/MineView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.user.is_login) {
    next({ name: 'login' })
  } else if (to.meta.guestOnly && userStore.user.is_login) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
