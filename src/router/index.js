import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "layout-index" */ '../components/layout/index.vue'),
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about-index" */ '../views/about.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
