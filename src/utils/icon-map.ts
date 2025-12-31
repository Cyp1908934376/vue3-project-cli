import { defineAsyncComponent, type DefineComponent } from 'vue'
import * as ELIcons from '@element-plus/icons-vue'

/* ---------- ElementPlus 官方图标 ---------- */
export const elIconMap: Record<string, (typeof ELIcons)[keyof typeof ELIcons]> = ELIcons

/* ---------- 本地 SVG（vite 自动导入） ---------- */
const svgModules = import.meta.glob<{ default: DefineComponent }>('/src/icons/*.svg', {
  as: 'component',
})
export const svgIconMap: Record<string, ReturnType<typeof defineAsyncComponent>> = {}
for (const [path, comp] of Object.entries(svgModules)) {
  const name = path.match(/\/([^\/]+)\.svg$/)?.[1] || ''
  svgIconMap[name] = defineAsyncComponent(
    comp as unknown as () => Promise<{ default: DefineComponent }>,
  )
}

/* ---------- iconfont 字体类 ---------- */
export const fontIconSet = new Set(['dashboard', 'user', 'setting']) // 你的 iconfont 图标名
