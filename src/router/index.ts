import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // 使用 Web History 模式（網址不帶 # 符號）
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // 定義路由規則
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, // 直接匯入組件
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: () => import('../views/LifecycleView.vue'),
    },
  ],
})

export default router
