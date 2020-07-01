import Vue from 'vue'
import VueRouter from 'vue-router'
import User from './user'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  User
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
