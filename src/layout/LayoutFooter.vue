<template>
  <footer class="layout-footer" ref="el">
    <slot>
      <div class="footer-content">
        <span class="copyright">
          Copyright © {{ currentYear }} Your Company Name. All Rights Reserved.
        </span>
        <span class="separator">|</span>
        <span class="version">Version {{ appVersion }}</span>
      </div>
    </slot>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const el = ref<HTMLElement | null>(null)
const store = useLayoutStore()
const currentYear = computed(() => new Date().getFullYear())
const appVersion = ref('')

let ro: ResizeObserver | null = null
let _update: (() => void) | null = null

onMounted(() => {
  try {
    // 如果你在 vite.config.ts 里配置了 import.meta.env.VITE_APP_VERSION，优先使用
    if (import.meta.env.VITE_APP_VERSION) {
      appVersion.value = import.meta.env.VITE_APP_VERSION
    } else {
      // 降级处理：硬编码默认值
      appVersion.value = '1.0.0'
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    appVersion.value = '1.0.0'
  }
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
  flex-shrink: 0;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: var(--color-muted);
  z-index: 1;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.separator {
  color: var(--color-border);
  margin: 0 4px;
}

.version {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  background-color: var(--color-bg-secondary);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }

  .separator {
    display: none;
  }
}
</style>
