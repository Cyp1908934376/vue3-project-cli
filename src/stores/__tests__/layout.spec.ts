import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLayoutStore } from '../layout'

describe('layout store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes and updates sizes', () => {
    const store = useLayoutStore()

    // default values should be numbers (Pinia unwraps refs)
    expect(typeof store.width).toBe('number')
    expect(typeof store.height).toBe('number')

    store.setSidebarWidth(200)
    store.setHeaderHeight(50)
    store.setFooterHeight(30)
    store.setWindowSize(1024, 800)

    expect(store.sidebarWidth).toBe(200)
    expect(store.headerHeight).toBe(50)
    expect(store.footerHeight).toBe(30)

    expect(store.contentWidth).toBe(1024 - 200)
    expect(store.contentHeight).toBe(800 - 50 - 30)
  })

  it('registers and removes window listener safely', () => {
    const store = useLayoutStore()
    store.initWindowSizeListener()
    expect(store.width).toBeDefined()
    store.stopWindowSizeListener()
  })
})
