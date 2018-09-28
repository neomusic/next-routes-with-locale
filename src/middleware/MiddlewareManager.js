'use strict'

import async from 'async'
import clonedeep from 'lodash.clonedeep'

export default (middlewares = [], initialData = {}) => {
  const reversed = clonedeep(middlewares).reverse()
  return async.compose(
    ...reversed,
    function (cb) {
      cb(null, initialData)
    },
  )
}