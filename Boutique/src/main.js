import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/shop/:category?', component: () => import('./views/ShopView.vue') },
    { path: '/cart', component: () => import('./views/CartView.vue') },
  ]
})

createApp(App).use(router).mount('#app')
