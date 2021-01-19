import { createRouter, createWebHistory } from 'vue-router'
import { userProvider } from '@/providers'
import { isAuthenticated } from './middleware'

const routeNames = {
  START: 'start',
  SIGN_IN: 'signin',
}

const routes = [
  {
    name: routeNames.START,
    path: '/',
    meta: {
      middleware: [isAuthenticated],
    },
    component: () => import('@/views/Start.vue'),
  },
  {
    name: routeNames.SIGN_IN,
    path: '/sign-in',
    component: () => import('@/views/SignIn.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const nextFactory = (context, middleware, index) => {
  const subsequentMiddleware = middleware[index]

  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to,
      userProvider,
      routeNames,
    }

    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

export {
  router as default,
  routeNames,
}