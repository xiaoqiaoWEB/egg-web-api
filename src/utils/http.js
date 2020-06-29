import request from './request'

const http = {
  /*
    *methods
    *@param url
    *@parma parmas
  */
  get (url, parmas) {
    const config = {
      methods: 'get',
      url: url
    }
    if (parmas) config.parmas = parmas
    return request(config)
  },
  post (url, parmas) {
    const config = {
      methods: 'post',
      url: url
    }
    if (parmas) config.parmas = parmas
    return request(config)
  }
}
export default http
