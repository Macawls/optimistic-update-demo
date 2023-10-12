import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'
import './styles/app.css'
import 'animate.css'

createApp(App)
.use(router)
.use(createPinia())
.mount('#app')
