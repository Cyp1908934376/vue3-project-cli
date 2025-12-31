<template>
  <!-- 1. 本地 SVG -->
  <component v-if="type === 'svg'" :is="svgIconMap[iconName]" :style="style" class="custom-icon" />

  <!-- 2. ElementPlus 图标 -->
  <el-icon v-else-if="type === 'el'" :size="size" :color="color">
    <component :is="elIconMap[iconName]" />
  </el-icon>

  <!-- 3. iconfont 字体类 -->
  <i v-else-if="type === 'font'" class="iconfont" :class="`icon-${iconName}`" :style="style"></i>

  <!-- 4. 兜底 -->
  <span v-else :style="style"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { elIconMap, svgIconMap, fontIconSet } from '@/utils/icon-map'

interface Props {
  iconName: string
  size?: number | string
  color?: string
}
const props = withDefaults(defineProps<Props>(), { size: 20, color: 'var(--color-text)' })

/* 自动判断来源 */
const type = computed(() => {
  if (svgIconMap[props.iconName]) return 'svg'
  if (elIconMap[props.iconName]) return 'el'
  if (fontIconSet.has(props.iconName)) return 'font'
  return ''
})

const style = computed(() => ({
  fontSize: /^\d+$/.test(String(props.size)) ? `${props.size}px` : props.size,
  color: props.color
}))
</script>

<style lang="less" scoped>
.custom-icon {
  fill: currentColor;
  vertical-align: middle;
}
</style>
