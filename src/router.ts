import { createRouter, createWebHistory } from 'vue-router'
import Hero from '~/pages/Hero.vue'
import Main from '~/pages/Main.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Hero },
    {
      path: '/:collectionId',
      component: Main,
    },
  ],
})

export default router
