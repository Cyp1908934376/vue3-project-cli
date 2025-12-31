<template>
  <aside class="layout-sidebar" ref="el">
    <!--
      优化点：
      1. 绑定 collapseStore 的状态
      2. 使用一个图标，通过 CSS 旋转实现动画
      3. 添加 click 事件触发切换
    -->
    <el-button class="sidebar-trigger" :class="{ 'is-collapsed': collapseStore.isCollapse }"
      :icon="collapseStore.isCollapse ? ArrowRightBold : ArrowLeftBold" @click="collapseStore.toggleSidebarCollapse()"
      circle size="middle" />
    <slot>Sidebar</slot>
  </aside>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useCollapseStore } from '@/stores/collapse'

const collapseStore = useCollapseStore()
const el = ref<HTMLElement | null>(null)
const store = useLayoutStore()

let ro: ResizeObserver | null = null
let animationFrameId: number | null = null

// 使用 requestAnimationFrame 优化高频触发
const updateWidth = () => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)

  animationFrameId = requestAnimationFrame(() => {
    if (el.value) {
      // 记录当前 Sidebar 的实际渲染宽度
      const width = el.value.getBoundingClientRect().width
      store.setSidebarWidth(width)
    }
  })
}

onMounted(() => {
  if (!el.value) return
  updateWidth() // 初始化

  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(updateWidth)
    ro.observe(el.value)
  } else {
    // 降级处理
    window.addEventListener('resize', updateWidth)
  }
})

onBeforeUnmount(() => {
  if (ro && el.value) ro.unobserve(el.value)
  if (ro) ro.disconnect()
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', updateWidth)
})

</script>

<style lang="less" scoped>
.layout-sidebar {
  position: relative;
  width: fit-content;
  min-width: var(--sidebar-min-width);
  max-width: var(--sidebar-max-width);
  height: 100%;
  background: var(--surface-2);
  border-right: 1px solid var(--color-border);
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: visible;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

/* --- 按钮核心样式 --- */
.sidebar-trigger {
  position: absolute;
  right: 0;
  top: 20px;
  transform: translate(50%, -50%);
  z-index: 10;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  background-color: var(--surface-0);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* --- 动画1: 悬停效果 (向外弹出) --- */
.sidebar-trigger:hover {
  /* 鼠标放上去时，向右多移动 4px */
  transform: translate(60%, -50%) scale(1.1);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* --- 动画2: 图标旋转 (切换状态时) --- */
/* Element Plus 的图标通常是 SVG，我们需要穿透 scoped 样式 */
.sidebar-trigger :deep(.el-icon) {
  transition: transform 0.4s ease;
  display: inline-block;
  /* 必须是块级元素或行内块才能旋转 */
}

/* 当状态为折叠时 (is-collapsed 为 true)，图标旋转 180 度 */
.is-collapsed .sidebar-trigger :deep(.el-icon) {
  transform: rotate(180deg);
}
</style>
