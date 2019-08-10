import urljoin from 'url-join'
import { basicXhr } from './utils.js'

let baseUrl = null

function ShopModel (raw) {
  raw.full_address = `${raw.address}, ${raw.zipcode} ${raw.city}`
  raw.coords = {
    lat: raw.latitude,
    lng: raw.longitude,
  }
  return raw
}

export const client = {
  init: function (url) {
    baseUrl = url
  },
  getShopNames () {
    return basicXhr(urljoin(baseUrl, 'api/v0/shop-names/'), 'GET')
  },
  async getShops () {
    const rawShops = await basicXhr(urljoin(baseUrl, 'api/v0/shops/'), 'GET')
    return rawShops.map(ShopModel)
  },
  async getShop (slug) {
    const rawShop = await basicXhr(urljoin(baseUrl, `api/v0/shop/${slug}/`), 'GET')
    return ShopModel(rawShop)
  }
}
