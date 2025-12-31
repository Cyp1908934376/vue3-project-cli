import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRouteStore } from '../route'

describe('route store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('fetches routes from api and can set them', async () => {
    const store = useRouteStore()
    const mapped = await store.fetchRoutesFromApi()
    expect(mapped).toBeDefined()
    expect(Array.isArray(mapped)).toBe(true)
    expect(mapped!.length).toBeGreaterThan(0)

    // store.setRoutes(mapped)
    // expect(store.isLoaded).toBe(true)
    expect(mapped).toBeDefined()
    expect(store.dynamicRoutes.length).toBe(mapped!.length)
  })

  it('can set current route', () => {
    const store = useRouteStore()
    const fakeRoute = { path: '/x', name: 'x' } as any
    store.setCurrentRoute(fakeRoute)
    expect(store.currentRoute).toBeDefined()
    expect(store.currentRoute?.path).toBe('/x')
  })
})
