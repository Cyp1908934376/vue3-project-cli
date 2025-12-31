import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const width = ref<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const height = ref<number>(typeof window !== 'undefined' ? window.innerHeight : 0)

  const headerHeight = ref<number>(0)
  const footerHeight = ref<number>(0)
  const sidebarWidth = ref<number>(0)

  const contentWidth = computed(() => Math.max(0, width.value - sidebarWidth.value))
  const contentHeight = computed(() =>
    Math.max(0, height.value - headerHeight.value - footerHeight.value),
  )

  function setWindowSize(w: number, h: number) {
    width.value = w
    height.value = h
  }

  function setHeaderHeight(h: number) {
    headerHeight.value = h
  }

  function setFooterHeight(h: number) {
    footerHeight.value = h
  }

  function setSidebarWidth(w: number) {
    sidebarWidth.value = w
  }

  let _listener: ((this: Window, ev?: UIEvent) => void) | null = null
  function initWindowSizeListener() {
    if (typeof window === 'undefined' || _listener) return
    _listener = () => setWindowSize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', _listener)
    // initialize
    _listener.call(window)
  }

  function stopWindowSizeListener() {
    if (typeof window === 'undefined' || !_listener) return
    window.removeEventListener('resize', _listener)
    _listener = null
  }

  return {
    width,
    height,
    headerHeight,
    footerHeight,
    sidebarWidth,
    contentWidth,
    contentHeight,
    setWindowSize,
    setHeaderHeight,
    setFooterHeight,
    setSidebarWidth,
    initWindowSizeListener,
    stopWindowSizeListener,
  }
})
