import Vue from 'vue'
import VueRouter from 'vue-router'
import System from './system'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  System
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
