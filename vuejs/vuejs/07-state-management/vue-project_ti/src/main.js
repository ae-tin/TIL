import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersitedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersitedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
