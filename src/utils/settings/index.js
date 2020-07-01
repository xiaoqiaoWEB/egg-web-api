const gbs = {
  host: 'http://my.web.com',
  locker_prefix: 'PASSCLOUD_PASS_',
  secret_key: '^xiaoqwiaoWEB',
  domain: '',
  api_host: 'http://api.web.com',
  secret: {
    key_str: '^xiaoqwiaoWEB',
    iv_str: '^xiaoqwiaoWEB'
  }
}

const cbs = {}

const enums = {
  USER: {
    AUTH_TOKEN: 'AUTH_TOKEN',
    REMEMBER_ME: 'REMEMBER_ME',
    REDIRECT_URL: 'REDIRECT_URL'
  }
}

export {
  gbs,
  cbs,
  enums
}
