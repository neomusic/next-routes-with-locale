/* eslint-disable no-undef */

const back = () => { window.history.back() }
const push = (url) => { window.location.href = url }
const replace = (url) => { window.location.replace(url) }


export default { back,push,replace}