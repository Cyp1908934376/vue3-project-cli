// src/utils/router/routerUtil.ts
import router from '@/router' // 请确保你的 router/index.ts 有默认导出 export default router
import type { RouteLocationRaw } from 'vue-router'

class RouterUtil {
  /**
   * 基础跳转 (无参数)
   * @param path 路由地址 (例如: '/home', '/login')
   */
  static go(path: string) {
    router.push(path)
  }
  /**
   * 带显示参数的跳转
   * URL 表现: /target?name=zhangsan&age=18
   * 适合用于: 搜索条件、分页等不需要隐藏的参数
   * @param path 路由地址
   * @param query 参数对象
   */
  static goWithQuery(path: string, query: Record<string, string | number | (string | number)[]>) {
    router.push({
      path,
      query,
    })
  }
  /**
   * 带隐藏参数的跳转
   * URL 表现: /target/123 (URL 中不会出现参数名，但路由配置需支持)
   * 注意: 必须在路由配置中定义 path 如: '/target/:id'
   * 适合用于: 业务ID、详情页ID等
   * @param name 路由名称
   * @param params 参数对象
   */
  static goWithParams(name: string, params: Record<string, string | number>) {
    router.push({
      name,
      params,
    })
  }
  /**
   * 万能跳转方法 (如果你想一次性传所有参数)
   * @param location RouteLocationRaw
   */
  static push(location: RouteLocationRaw) {
    router.push(location)
  }
  /**
   * 替换当前页面 (不产生历史记录)
   */
  static replace(path: string) {
    router.replace(path)
  }
  /**
   * 返回上一页
   */
  static back() {
    router.back()
  }
}
export default RouterUtil
