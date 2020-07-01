import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Minx from './mixins'
import filters from './filters'
import Bus from './vuebus'
import axios from 'axios'
import { Cookie, enums } from './utils'

Vue.config.productionTip = false

Vue.prototype.$Bus = Bus
Vue.prototype.$Cookie = Cookie
Vue.prototype.$http = axios.create({
  timeout: 1000 * 3
})

if (process.env.NODE_ENV === 'production') {
  Vue.prototype.$http.defaults.baseURL = ''
}

Vue.prototype.$http.interceptors.request.use((config) => {
  // eslint-disable-next-line camelcase
  var access_url = ['/admin/login']
  var url = config.url
  var isUrl = access_url.includes(url)

  if (!isUrl) {
    store.dispatch('get_access_token', (res) => {
      if (res) {
        config.headers.Authorization = 'Bearer ' + res
      }
    })
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

Vue.prototype.$http.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    if (res.data) {
      return res.data
    }
  } else {
    if (res.data.code === 401) {
      Vue.prototype.$notify.error({
        title: '错误',
        message: '没有权限，请重新登陆！',
        showClose: false,
        duration: 2000
      })
      jumpPage()
    } else {
      Vue.prototype.$notify.error({
        title: '错误',
        message: res.data.error,
        showClose: false,
        duration: 2000
      })
    }

    return Promise.reject(res)
  }
}, (error) => {
  console.log(error)
})

router.beforeEach((to, from, next) => {
  Cookie.set({
    key: enums.USER.REDIRECT_URL,
    value: window.location.href
  })
  next()
  var authToken = store.getters.getAccessToken

  if (authToken && authToken.access_token) {
    if (to.name === 'Login') {
      window.location.href = 'http://localhost:8888/user/list'
    }
    updateUserMenu()
  } else {
    if (to.name !== 'Login') {
      window.location.href = 'http://localhost:8888'
    }
  }
})

function jumpPage () {
  window.location.href = 'http://localhost:8888'
}

function updateUserMenu () {
  console.log('这里获取菜单')
}

Vue.mixin(Minx)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
