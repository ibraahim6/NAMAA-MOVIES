import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'MoviesListPage' },
      children: [
        {
          path: '/movies-list',
          name: 'MoviesListPage',
          component: () => import('@/views/MoviesListPage/index.vue')
        },
        {
          path: '/add-movie',
          name: 'MovieAddPage',
          component: () => import('@/views/MovieAddPage/index.vue')
        },
        {
          path: '/movie/:id/edit',
          name: 'MovieEditPage',
          component: () => import('@/views/MovieEditPage/index.vue')
        },
        {
          path: '/movie/:id/view',
          name: 'MovieViewPage',
          component: () => import('@/views/MovieViewPage/index.vue')
        }
      ]
    }
  ]
})

export default router
