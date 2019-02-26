import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from './pages/landing'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: LandingPage },
]

const router = new VueRouter({
  routes,
})

export default router
