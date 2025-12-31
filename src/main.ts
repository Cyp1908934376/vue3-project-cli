import './assets/main.css'
import '@/styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

// Optionally initialize dynamic routes on startup
import { useRouteStore } from '@/stores/route'
const routeStore = useRouteStore()
routeStore.fetchRoutesFromApi().then((mapped) => {
  if (mapped && mapped.length) {
    mapped.forEach((r) => router.addRoute(r))
    routeStore.setDynamicRoutes(mapped)
  }
})

// Initialize theme based on user preference
import { initTheme } from '@/utils/theme'
initTheme()

app.mount('#app')
