<template>
  <el-image class="logo" :class="{ 'logo-collapsed': collapseStore.isCollapse }" :src="logoSrc" :fit="fit">
    <template #error>
      <div class="image-viewer-slot image-slot">
        <el-icon><icon-picture /></el-icon>
      </div>
    </template>

  </el-image>
</template>
<script setup lang="ts">
import { useCollapseStore } from '@/stores/collapse'
import logoSrc from '@/assets/logo.svg';
const fit = 'contain'
const collapseStore = useCollapseStore() // 获取 store 实例


</script>
<style lang="less" scoped>
.logo {
  width: var(--sidebar-max-width);
  height: var(--header-logo-height);
  padding: 4px;
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s;
  white-space: nowrap;
}

/* 2. 定义折叠状态下的样式 */
.logo.logo-collapsed {

  /* 折叠状态下，Logo 宽度等于侧边栏最小宽度 和sidebar-min 宽度一致 */
  width: var(--sidebar-min-width);
  /* 可选：折叠时如果不显示文字，可以隐藏 overflow */
  overflow: hidden;
}
</style>
