import { gbs } from '../settings'
import Lockr from 'lockr'

class Vlockr {
  constructor () {
    this.pcPrefix = gbs.locker_prefix
    this.secrteKey = gbs.secret_key
  }

  set (key, value, fn) {
    Vlockr.checkKey(key)
    Lockr.set(this.pcPrefix + key, value)
    fn && fn()
  }

  get (key) {
    Vlockr.checkKey(key)
    return Lockr.get(this.pcPrefix + key)
  }

  delete (key, fn) {
    Vlockr.checkKey(key)
    Lockr.rm(this.pcPrefix + key)
  }

  add (key, value, fn) {
    Vlockr.checkKey(key)
    Lockr.sadd(this.pcPrefix + key, value)
    fn && fn()
  }

  getList (key) {
    Vlockr.checkKey(key)
    return Lockr.smembers(this.pcPrefix + key)
  }

  // 是否存在
  contains (key, value, fn) {
    Vlockr.checkKey(key)
    return Lockr.sismember(this.pcPrefix + key, value)
  }

  // 移除指定键下的值
  remove (key, value, fn) {
    Vlockr.checkKey(key)
    Lockr.srem(this.pcPrefix + key, value)
  }

  removeAll (key, fn) {
    Vlockr.checkKey(key)
    var smembers = Lockr.smembers(this.pcPrefix)
    for (var index in smembers) {
      Lockr.srem(this.pcPrefix + key, smembers[index])
    }
    fn && fn()
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

export default new Vlockr()
