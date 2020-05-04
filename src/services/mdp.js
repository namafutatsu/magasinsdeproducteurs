import urljoin from 'url-join'
import { basicXhr } from './utils.js'
import {
  saveToken,
  setRemember,
} from 'src/storage'


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
  // FIXME(vperron): Probably unused
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
  },
  signup: async function (username, email, password1, password2) {
    await basicXhr(
      urljoin(baseUrl, 'json_signup/'),
      'POST',
      JSON.stringify({
        'username': username,
        'email': email,
        'password1': password1,
        'password2': password2,
      })
    )
  },
  getToken: async function (username, password, rememberMe) {
    const data = await basicXhr(urljoin(baseUrl, 'account/token/'), 'POST', JSON.stringify({
      'username': username,
      'password': password,
    }))
    if (data.token) {
      saveToken(data.token)
      if (rememberMe) setRemember()
      return data.token
    }
    throw new Error('unexpected error')
  },
}
