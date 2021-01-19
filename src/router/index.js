import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'start',
    path: '/',
    component: () => import('@/views/Start.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router