import { defineStore } from 'pinia'
import { ref } from 'vue'
/**
 * 全局侧边栏折叠状态管理
 */
export const useCollapseStore = defineStore('collapse', () => {
  const isCollapse = ref(false)
  const collapsePosition = ref<'top' | 'side'>('side')

  const toggleSidebarCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  const toggleCollapsePosition = () => {
    collapsePosition.value = collapsePosition.value === 'side' ? 'top' : 'side'
  }

  return { isCollapse, toggleSidebarCollapse, collapsePosition, toggleCollapsePosition }
})
