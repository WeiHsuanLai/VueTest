import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 建立 Vue 應用程式實例
const app = createApp(App)

// 使用 Pinia 進行狀態管理
app.use(createPinia())

// 使用 Vue Router 處理路由
app.use(router)

// 將應用程式掛載到 index.html 中的 #app 元素
app.mount('#app')
