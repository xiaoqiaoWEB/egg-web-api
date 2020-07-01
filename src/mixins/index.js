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
    }
  }
}

export default mixin
