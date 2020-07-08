const mixin = {
  data () {
    return {}
  },
  methods: {
    loadPage (routerName, parma) {
      if (parma) {
        this.$router.push({
          name: routerName,
          query: parma
        })
      } else {
        this.$router.push({
          name: routerName
        })
      }
    },
    goBack () {
      this.$route.go(-1)
    },
    ajax (parma) {
      var { type, url, data, responseType, success, errCallBack } = parma
      this.$http({
        method: type || 'post',
        url: url || '',
        data: data || '',
        responseType: responseType || ''
      })
        .then(res => {
          if (success) {
            success(res)
          } else {
            this.goBack()
          }
        })
        .catch(error => {
          errCallBack && errCallBack(error)
        })
    },
    formatDate (time, fmt) {
      var date = new Date(time)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (var k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          var str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    }
  }
}

export default mixin
