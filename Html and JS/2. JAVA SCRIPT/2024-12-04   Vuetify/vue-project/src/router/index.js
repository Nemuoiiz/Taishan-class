// 為路由設定檔

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // meta 自定義頁面資訊
      meta: {
        apple: '首頁',
      },
    },
    {
      path: '/yangmingshan',
      name: 'yangmingshan',
      component: () => import('@/views/YangMingShanView.vue'),
      meta: {
        apple: '陽明山',
      },
    },
  ],
})

// 🔻 進到每一頁之前去執行 function
// router.beforeEach(() => {})

// 🔻 進到每一頁之後去執行 function
// to   => 目標路由 (要去哪個頁面)
// from => 來源路由 (從哪個頁面來)
router.afterEach((to, from) => {
  document.title = to.meta.apple + '｜國家公園介紹網'
})

export default router
