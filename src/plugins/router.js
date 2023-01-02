import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'POMODORO'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: {
        title: 'POMODORO - settings'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue'),
      meta: {
        title: 'POMODORO - list'
      }
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
