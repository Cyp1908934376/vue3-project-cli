import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LayoutShell from '@/layout/LayoutShell.vue'
import { useRouteStore } from '@/stores/route'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutShell,
      children: [
        {
          path: 'board',
          name: 'board',
          component: () => import('../views/dashboard/index.vue'),
          meta: { title: '仪表盘', requiresAuth: false, icon: 'Setting' },
        },
        {
          path: 'test-layout',
          name: '布局测试',
          component: () => import('../views/TestLayout.vue'),
          meta: { hidden: false, icon: 'Setting' }, // 测试路由可以隐藏
        },
        // ... 其他静态路由
      ],
    },
  ],
})
export default router
// 路由守卫
router.beforeEach(async (to, from, next) => {
  const routeStore = useRouteStore()
  // 1. 加载动态路由
  if (!routeStore.isLoaded) {
    try {
      const mappedRoutes = await routeStore.fetchRoutesFromApi()
      // 2. 将路由添加到 Vue Router 实例中
      if (mappedRoutes && mappedRoutes.length > 0) {
        mappedRoutes.forEach((r: RouteRecordRaw) => router.addRoute('layout', r))
        // 3. 将路由存入 Pinia (触发 menuTree 和 flatRoutes 计算)
        routeStore.setDynamicRoutes(mappedRoutes)
        // 4. 刷新当前匹配 (重要：addRoute 后需要重新进入)
        return next({ ...to, replace: true })
      }
    } catch (e) {
      console.error('Failed to load dynamic routes', e)
    }
  }
  // 简单的权限检查逻辑
  const requiresAuth = to.meta?.requiresAuth
  if (requiresAuth) {
    const fakeLoggedIn = true // 模拟登录状态
    if (!fakeLoggedIn) return next({ name: 'login' }) // 假设有登录页
  }
  next()
})
// 同步当前路由状态
router.afterEach((to) => {
  const routeStore = useRouteStore()
  routeStore.setCurrentRoute(to)
})
