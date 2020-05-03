import Vue from 'vue'
import VueRouter from 'vue-router'

import AboutPage from './pages/about'
import DetailPage from './pages/detail'
import LandingPage from './pages/landing'
import LoginPage from './pages/login'
import LegalTermsPage from './pages/terms'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: LandingPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/shop/:slug', name: 'detail', component: DetailPage },
  { path: '/qui-sommes-nous', name: 'qui-sommes-nous', component: AboutPage },
  { path: '/mentions-legales', name: 'mentions-legales', component: LegalTermsPage },
]

const router = new VueRouter({
  routes,
})

export default router
