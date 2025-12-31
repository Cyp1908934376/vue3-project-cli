	<template>
    <div class="layout-root">
      <!-- 顶部导航 -->
      <LayoutHeader>
        <Logo @click="logoClick" />
        <TopMenu v-if="'top' == collapseStore.collapsePosition" />
        <center-tool />
      </LayoutHeader>
      <!-- 主体区域 -->
      <div class="layout-body">
        <!-- 左侧侧边栏 -->
        <LayoutSidebar v-if="'side' == collapseStore.collapsePosition">
          <!--
	           1. 绑定 collapse 状态到菜单组件
	           2. active-menu 由路由自动管理，所以这里移除了硬编码的 :active-menu="2"
	        -->
          <SideMenu :collapse="collapseStore.isCollapse" />
        </LayoutSidebar>
        <!-- 右侧内容区 -->
        <main class="layout-main">
          <router-view />
        </main>
      </div>
      <!-- 底部 -->
      <LayoutFooter />
    </div>
  </template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSidebar from './LayoutSidebar.vue'
import LayoutFooter from './LayoutFooter.vue'
import { useLayoutStore } from '@/stores/layout'
import { useCollapseStore } from '@/stores/collapse'
import SideMenu from '@/components/menu/SideMenu.vue' // 引入之前优化好的递归菜单
import TopMenu from '@/components/menu/TopMenu.vue'
import Logo from '@/components/header/HeaderLogo.vue'

import CenterTool from '@/components/header/CenterTool.vue'
import RouterUtil from '@/utils/routerUtil'

const store = useLayoutStore()
const collapseStore = useCollapseStore()

// 当 collapsePosition 切换到 'top' 时清理 sidebarWidth，避免残留旧宽度
watch(
  () => collapseStore.collapsePosition,
  (pos) => {
    if (pos === 'top') store.setSidebarWidth(0)
  },
)

onMounted(() => {
  // 如果需要在全局窗口 resize 时做特殊处理（比如重置某些状态），可以保留
  // 但现在的布局主要依赖 CSS Flex 和 ResizeObserver
  store.initWindowSizeListener()
})
onBeforeUnmount(() => {
  store.stopWindowSizeListener()
})

/**
 * 点击 Logo 跳转到看板首页
 */
const logoClick = () => {
  console.log('logo clicked')
  RouterUtil.go("/board")
}
</script>
<style lang="less" scoped>
/* 整体布局：垂直排列 */
.layout-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;

}

/* 主体布局：水平排列 (Sidebar + Main) */
.layout-body {
  display: flex;
  flex: 1;
  /* 占满 Header 和 Footer 剩余的高度 */
  overflow: hidden;
  /* 防止整个页面滚动，让 main 内部滚动 */
  position: relative;
  /* 作为内部绝对定位的参考 */
  width: 100%;
}

/* 主内容区域 */
.layout-main {
  flex: 1;
  /* 自动占据剩余宽度，不需要手动计算 margin-left */
  padding: var(--space-4);
  overflow-y: auto;
  /* 内容区独立滚动 */
  /* 可选：给内容区加一点过渡效果 */
  transition: opacity 0.3s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
}

/* 折叠按钮样式微调 */
.toggle-button {
  margin-left: auto;
  /* 推到右边 */
}
</style>
