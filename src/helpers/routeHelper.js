
export const generateRouteFromObjectName = (routeObject, defaultLocale) => {
  const options = routeObject

  if (!options || !options.name) {
    throw new Error('Unnamed routes not supported')
  }

  if (!options.page) {
    options.page = options.name
  }

  const locale = options.locale || defaultLocale
  const update = options.update || false

  const { name, page, pattern, data } = options
  return { name, page, pattern, data, locale, update }
}

export const redirectToLocalizedHome = (res, locale) => {
  if (typeof res.redirect === 'function') {
    res.redirect(301, `/${locale}`)
  } else {
    res.writeHead(301, { 'Location': `/${locale}` })
    res.end()
  }
}

export const detectLocale = ({ req, routes, defaultLocale }) => {
  const acceptsLangs = typeof req.acceptsLanguages === 'function' && req.acceptsLanguages()
  const langs = !acceptsLangs ? [] : acceptsLangs.filter(lang => lang.length === 2)
  const routesLangs = routes.map(({ locale }) => locale)
  return routesLangs.indexOf(langs[0]) > -1 ? langs[0] : defaultLocale
}