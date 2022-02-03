import { createRouter, createWebHistory } from 'vue-router'
import Hero from '~/pages/Hero.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: Hero }],
})

export default router
