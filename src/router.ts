import { createRouter, createWebHistory } from 'vue-router'
import Setup from '~/pages/Setup.vue'
import Main from '~/pages/Main.vue'

export const routes = [
  { path: '/', component: Setup },
  {
    path: '/:collectionId',
    component: Main,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
