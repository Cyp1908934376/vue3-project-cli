<template>
  <el-menu :default-active="activeIndex" class="top-menu" :collapse="collapseStore.isCollapse" :unique-opened="true"
    mode="horizontal" router>
    <!-- 直接遍历 store 中的菜单树，使用递归组件渲染 -->
    <menu-item v-for="route in routeStore.menuTree" :key="route.path" :route="route" />
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCollapseStore } from '@/stores/collapse'
import { useRouteStore } from '@/stores/route'
import MenuItem from '@/components//menu/MenuItem.vue' // 引入递归组件
// import CustomIcon from ... // 不需要在这里引入，已经在 MenuItem 里引入
const collapseStore = useCollapseStore()
const routeStore = useRouteStore()
const route = useRoute()
// 使用 vue-router 的 route.path 作为激活索引是最准确的
const activeIndex = computed(() => route.path)
</script>

<style lang="less" scoped>
/* 去掉 el-menu 自带的边框 */
.el-menu--horizontal.el-menu {
  border-bottom: 0px solid var(--el-menu-border-color);
}

/* 菜单项颜色 */
.top-menu :deep(.el-menu-item) {
  color: var(--color-muted);
}

.top-menu :deep(.el-menu-item.is-active) {
  color: var(--color-primary);
}

.top-menu:not(.el-menu--collapse) {
  /* 背景色 */
  --el-menu-bg-color: var(--menu-background-color);

  /* 默认文字颜色 */
  --el-menu-text-color: var(--menu-text-color);

  /* 选中时的文字颜色 */
  --el-menu-active-color: var(--menu-active-text-color);

  /* 鼠标悬停时的背景色 */
  --el-menu-hover-bg-color: var(--menu-hover-bg-color);

  /* 子菜单标题背景色 */
  --el-menu-submenu-bg-color: var(--menu-background-color);
}

/* 自定义选中时的背景条样式 */
.top-menu:deep(.el-menu-item.is-active) {
  background-color: var(--menu-selected-bg-color) !important;
  border-right: 4px solid var(--menu-selected-border-color);
}

/* 自定义子菜单标题的样式 */
.top-menu:deep(.el-sub-menu__title) {
  color: var(--menu-text-color) !important;
}
</style>
