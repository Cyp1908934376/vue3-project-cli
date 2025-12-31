<template>
  <div class="demo-main">
    <h2>布局信息（Test Layout Page）</h2>
    <div class="info-grid">
      <div>窗口宽度: <strong>{{ store.width }}</strong></div>
      <div>窗口高度: <strong>{{ store.height }}</strong></div>
      <div>头部高度: <strong>{{ store.headerHeight }}</strong></div>
      <div>底部高度: <strong>{{ store.footerHeight }}</strong></div>
      <div>侧边宽度: <strong>{{ store.sidebarWidth }}</strong></div>
      <div>内容宽度: <strong>{{ store.contentWidth }}</strong></div>
      <div>内容高度: <strong>{{ store.contentHeight }}</strong></div>
    </div>
    <el-button>打印布局信息到控制台</el-button>
    <el-button class="toggle-button" @click="collapseStore.toggleCollapsePosition">
      切换菜单位置
    </el-button>
    <p>调整窗口大小或改变侧边/头部高度（在 devtools 里修改样式）可以看到数值变化。</p>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import { onMounted, onBeforeUnmount } from 'vue'
import { useCollapseStore } from '@/stores/collapse'

const store = useLayoutStore()
const collapseStore = useCollapseStore()

// Ensure listener active when this page is visited
onMounted(() => store.initWindowSizeListener())
onBeforeUnmount(() => store.stopWindowSizeListener())
</script>

<style lang="less" scoped>
.logo-row {
  display: flex;
  gap: 0.5rem;
  align-items: center
}

.title {
  font-weight: 700
}

.demo-main {
  padding: var(--space-4)
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem
}
</style>
