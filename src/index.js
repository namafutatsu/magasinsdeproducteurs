/* global MDP_API_URL */

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

import 'src/styles.scss'

import rootPage from './pages/root.vue'
import router from './routes'
import { client } from './services/mdp'

function configure () {
  if (MDP_API_URL) {
    client.init(MDP_API_URL)
  } else {
    throw new Error('Could not connect to backend, no URL was defined.')
  }

  window.MdpApi = client

  window.Vue = Vue

  Vue.use(VueAnalytics, {
    id: 'UA-135259385-1',
    router,
  })
}

async function bootstrapApplication () {

  new Vue( // eslint-disable-line no-new
    Object.assign({
      el: '#content',
      router,
    }, rootPage)
  )
}

configure()
bootstrapApplication()
