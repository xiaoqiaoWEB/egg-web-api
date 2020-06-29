import axios from 'axios'
import { Message, Switch } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 3 * 1000
})

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
        break
    }
  } else {
    // 超时
    console.log('timeout')
  }
  Message.error(error.message)
  return Promise.resolve(error.message)
})

export default service
