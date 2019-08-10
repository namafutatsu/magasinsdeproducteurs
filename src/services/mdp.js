import urljoin from 'url-join'
import { basicXhr } from './utils.js'

let baseUrl = null

export const client = {
  init: function (url) {
    baseUrl = url
  },
  getShops () {
    return basicXhr(urljoin(baseUrl, 'api/v0/shops/'), 'GET')
  },
}
