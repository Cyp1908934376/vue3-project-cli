import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LayoutShell from '../LayoutShell.vue'

describe('LayoutShell', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('renders slots and composes layout', () => {
    const wrapper = mount(LayoutShell, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterView: { template: '<div class="test-main">M</div>' },
        },
      },
    })

    expect(wrapper.find('.layout-header').exists()).toBe(true)
    expect(wrapper.find('.layout-sidebar').exists()).toBe(true)
    expect(wrapper.find('.test-main').exists()).toBe(true)
    expect(wrapper.find('.layout-footer').exists()).toBe(true)
  })
})
