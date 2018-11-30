/* global jest, describe, test, expect */
import { setupRoute } from './helpers'

describe('Router push', () => {

  test('with name and params', () => {
    const { routes, route } = setupRoute('a', 'en', '/a/:b')
    const Router = routes.getRouter({ push: jest.fn() })
    const { href } = route.getUrls({ b: 'b' })
    Router.pushRoute('a', { b: 'b' }, 'en', {})
    expect(Router.push).toBeCalledWith(href)
  })
})

describe('Router replace', () => {

  test('with name and params', () => {
    const { routes, route } = setupRoute('a', 'en', '/a/:b')
    const Router = routes.getRouter({ replace: jest.fn() })
    const { href } = route.getUrls({ b: 'b' })
    Router.replaceRoute('a', { b: 'b' }, 'en', {})
    expect(Router.replace).toBeCalledWith(href)
  })
})