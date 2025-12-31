import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

type MenuRawRoute = RouteRecordRaw & {
  children?: MenuRawRoute[]
}
export const useRouteStore = defineStore('route', () => {
  const isLoaded = ref(false)
  const currentRoute = ref<RouteLocationNormalized | null>(null)
  // 动态路由原始数据
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  // --- 1. 获取静态菜单路由 (Layout 的 children) ---
  const staticMenuRoutes = computed<MenuRawRoute[]>(() => {
    // 获取名为 'layout' 的路由配置（即 LayoutShell）
    const layoutRoute =
      router.getRoutes().find((r) => r.name === 'layout') ||
      router.getRoutes().find((r) => r.path === '/')
    // 过滤掉重定向等非菜单项，只保留有 component 的路由
    return (layoutRoute?.children?.filter((route) => !route.meta?.hidden) as MenuRawRoute[]) || []
  })
  // --- 2. 核心数据：树状菜单数据 (用于侧边栏渲染) ---
  // 将静态路由和动态路由合并
  const menuTree = computed<MenuRawRoute[]>(() => {
    return [...staticMenuRoutes.value, ...dynamicRoutes.value]
  })
  // --- 3. 核心数据：扁平化路由数据 (用于面包屑、标签页、权限判断) ---
  const flatRoutes = computed<RouteRecordRaw[]>(() => {
    const flatten: RouteRecordRaw[] = []
    function traverse(routes: RouteRecordRaw[]) {
      routes.forEach((route) => {
        // 如果有 hidden 属性，通常不需要在扁平列表中显示（视需求而定，这里默认包含以便查找）
        flatten.push(route)
        if (route.children && route.children.length > 0) {
          traverse(route.children)
        }
      })
    }
    traverse(menuTree.value)
    return flatten
  })
  // --- Action: 设置动态路由 ---
  function setDynamicRoutes(routes: RouteRecordRaw[]) {
    dynamicRoutes.value = routes
    isLoaded.value = true
  }
  // --- Action: 从 API 获取路由 ---
  async function fetchRoutesFromApi(): Promise<RouteRecordRaw[]> {
    if (isLoaded.value) return []
    // 模拟 API 请求
    const res: RouteRecordRaw[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            path: '/dynamic',
            name: 'dynamic',
            component: () => import('@/views/DynamicPage.vue'),
            meta: { title: '动态页面', requiresAuth: false, icon: 'Star' },
          },
          {
            path: '/system',
            name: 'system',
            component: () => import('@/views/DynamicPage.vue'),
            meta: { title: '系统管理', icon: 'Setting' },
            children: [
              {
                path: 'users',
                name: 'users',
                component: () => import('@/views/DynamicPage.vue'),
                meta: { title: '用户管理', icon: 'User' },
              },
            ],
          },
        ])
      }, 10)
    })
    // 这里的组件映射逻辑可以根据后端返回的字符串路径进行动态 import
    // 目前为了演示，直接使用 mock 数据的 component
    const mapped = res.map((r) => {
      // 确保动态路由也有正确的 path 处理（如果后端没带 / 前缀）
      if (!r.path.startsWith('/') && !r.path.startsWith(':')) {
        r.path = '/' + r.path
      }
      return r
    })
    return mapped
  }
  function setCurrentRoute(route: RouteLocationNormalized) {
    currentRoute.value = route
  }
  function clearDynamicRoutes() {
    dynamicRoutes.value = []
    isLoaded.value = false
  }
  return {
    currentRoute,
    dynamicRoutes,
    isLoaded,
    // 暴露给组件使用的数据
    menuTree,
    flatRoutes,
    staticMenuRoutes,
    setDynamicRoutes,
    fetchRoutesFromApi,
    setCurrentRoute,
    clearDynamicRoutes,
  }
})
