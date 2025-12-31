<template>
  <footer class="layout-footer" ref="el">
    <slot>Footer</slot>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const el = ref<HTMLElement | null>(null)
const store = useLayoutStore()

let ro: ResizeObserver | null = null
let _update: (() => void) | null = null

onMounted(() => {
  if (!el.value) return
  _update = () => store.setFooterHeight(el.value ? el.value.offsetHeight : 0)

  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(_update)
    ro.observe(el.value!)
    _update()
  } else {
    _update()
    window.addEventListener('resize', _update)
  }
})

onBeforeUnmount(() => {
  if (ro && el.value) ro.unobserve(el.value)
  if (_update && typeof ResizeObserver === 'undefined') window.removeEventListener('resize', _update)
})
</script>

<style lang="less" scoped>
.layout-footer {
  height: var(--layout-footer-height);
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
  background: var(--surface-1);
}
</style>
