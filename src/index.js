/* global MDP_API_URL, MdpApi */

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

import 'src/styles.scss'

import rootPage from './pages/root.vue'
import router from './routes'
import { client } from './services/mdp'
import store from 'src/store'

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
  MdpApi.getUser().then((user) => {
    store.commit('setUser', user)
  }, () => {
    console.log('User is not authenticated.')
  })

  console.log("blah")

  new Vue( // eslint-disable-line no-new
    Object.assign({
      el: '#content',
      store,
      router,
    }, rootPage)
  )
}

configure()
bootstrapApplication()
