import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/shop/:category?', component: () => import('./views/ShopView.vue') },
    { path: '/product/:id', component: () => import('./views/ProductView.vue') },
    { path: '/cart', component: () => import('./views/CartView.vue') },
    { path: '/customs', component: () => import('./views/CustomsView.vue') },
    { path: '/contact', component: () => import('./views/ContactView.vue') },
    { path: '/about', component: () => import('./views/AboutView.vue') },
    { path: '/jobs', component: () => import('./views/JobsView.vue') },
  ]
})

createApp(App).use(router).mount('#app')
