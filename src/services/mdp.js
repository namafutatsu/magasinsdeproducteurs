import urljoin from 'url-join'
import { basicXhr } from './utils.js'
import {
  clearUserData,
  getStoredToken,
  saveToken,
} from 'src/storage'


let baseUrl = null

export const client = {
  init: function (url) {
    baseUrl = url
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
    const data = await basicXhr(urljoin(baseUrl, 'token/'), 'POST', JSON.stringify({
      'username': username,
      'password': password,
    }))
    if (data.token) {
      saveToken(data.token)
      return data.token
    }
    throw new Error('unexpected error')
  },
  getUser () {
    return basicXhr(urljoin(baseUrl, 'profile/'), 'GET', null, {
      'Authorization': `Token ${getStoredToken()}`,
    })
  },
}
