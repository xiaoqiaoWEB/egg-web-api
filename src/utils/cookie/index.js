import Cookie from 'js-cookie'
import { gbs } from '../settings'
class Vcookie {
  constructor () {
    this.pcPrefix = gbs.locker_prefix
    this.secretKey = gbs.secret_key
    this.domain = gbs.domain
    this.expireTime = 1
  }

  set (parmas) {
    let { key, value, expires, path, success } = parmas
    Vcookie.checkKey(key)
    key = this.pcPrefix + key
    Cookie.set(key, value, { expires: expires || this.expireTime, path: path || '/', domain: this.domain })
    success && success()
  }

  get (key) {
    Vcookie.checkKey(key)
    return Cookie.get(this.pcPrefix + key)
  }

  delete (parmas) {
    const { key, path, success } = parmas
    Vcookie.checkKey(key)
    Cookie.remove(this.pcPrefix + key, { path: path || '/', domain: this.domain })
    success && success()
  }

  static checkKey (key) {
    if (!key) {
      throw new Error(`没有找到${key}`)
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象')
    }
  }
}

export default new Vcookie()
