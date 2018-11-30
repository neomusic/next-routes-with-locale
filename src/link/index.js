/* eslint-disable no-undef */
'use strict'

import NextLink from 'next/link'
import { resolve, parse } from 'url'
import { getLocationOrigin } from 'next/dist/lib/utils'
import Router from './../Router'

function isLocal(href) {
  const url = parse(href, false, true)
  const origin = parse(getLocationOrigin(), false, true)

  return !url.host ||
    (url.protocol === origin.protocol && url.host === origin.host)
}

export default class Link extends NextLink {

  constructor(props) {
    super(props)
    this.linkClicked = this.linkClicked.bind(this)
  }

  linkClicked = e => {
    const { nodeName, target } = e.currentTarget
    if (nodeName === 'A' &&
      ((target && target !== '_self') || e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && e.nativeEvent.which === 2))) {
      // ignore click for new tab / new window behavior
      return
    }

    let { href } = this.props

    if (!isLocal(href)) {
      // ignore click if it's outside our scope
      return
    }

    const { pathname } = window.location
    href = resolve(pathname, href)

    e.preventDefault()

    const { replace } = this.props
    const changeMethod = replace ? 'replace' : 'push'

    Router[changeMethod](href)
  };
}