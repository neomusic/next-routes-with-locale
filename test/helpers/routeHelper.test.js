import { generateRouteFromObjectName, detectLocale } from './../../src/helpers/routeHelper'

describe('generateRouteFromObject()', () => {
  it('thrown err if name not exist', () => {
    const objectRoute = { foo: 'bar' }

    const error = () => {
      generateRouteFromObjectName(objectRoute)
    }

    expect(error).toThrowError(Error)
  })

  it('return object with defined structure', () => {
    const objectRoute = { name: 'bar', page: 'page', locale: 'en', update: true, foo: 'bar' }

    const result = generateRouteFromObjectName(objectRoute)

    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('page')
    expect(result).toHaveProperty('locale')
    expect(result).toHaveProperty('update')
    expect(result).not.toHaveProperty('foo')
  })

  it('should return an object with default locale if objectRoute is missing locale', () => {
    const objectRoute = { name: 'bar', page: 'page', update: true, foo: 'bar' }
    const defaultLocale = 'it'

    const { locale } = generateRouteFromObjectName(objectRoute, defaultLocale)
    expect(locale).toBe(defaultLocale)
  })

  it('return detected locale', () => {
    const req = {
      acceptsLanguages: () => { return ['it-IT', 'it', 'en', 'es'] }
    }

    const routes = [{ locale: 'en' }, { locale: 'it' }]
    const result = detectLocale({ req, routes, defaultLocale: 'en' })

    expect(result).toBe('it')
  })

  it('return default locale if detected is non supoorted', () => {
    const req = {
      acceptsLanguages: () => { return ['it-IT', 'es'] }
    }

    const routes = [{ locale: 'en' }, { locale: 'it' }]
    const result = detectLocale({ req, routes, defaultLocale: 'en' })

    expect(result).toBe('en')
  })
})