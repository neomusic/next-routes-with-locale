import { Routes as nextRoutes } from '../src'

export const setupRoute = (...args) => {
  const routes = nextRoutes({ locale: 'en' }).add(...args)
  const route = routes.routes[routes.routes.length - 1]
  return { routes, route }
}