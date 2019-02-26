import Vue from 'vue'
import Vuex from 'vuex'

import { clearUserData } from 'src/storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser (state, value) {
      if (!value) {
        clearUserData()
        location.reload()
      } else {
        state.user = value
      }
    },
  },
})

export default store
