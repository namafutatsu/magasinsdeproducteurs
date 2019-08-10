import Vue from 'vue'
import VueRouter from 'vue-router'

import DetailPage from './pages/detail'
import LandingPage from './pages/landing'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: LandingPage },
  { path: '/shop/:slug', name: 'detail', component: DetailPage },
]

const router = new VueRouter({
  routes,
})

export default router
