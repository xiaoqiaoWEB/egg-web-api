<template>
  <el-pagination
    background
    @size-change="handleSizecahnge"
    @current-change="handelCurrentCahnge"
    :current-page="pageNum"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 5,
      pageSizes: [5, 10, 15]
    }
  },
  props: {
    url: {
      type: String,
      required: true
    },
    queryData: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'get'
    }
  },
  created () {
    this.queryLisWithPage()
  },
  methods: {
    handleSizecahnge (pageSize) {
      this.pageSize = pageSize
      this.queryLisWithPage()
    },
    handelCurrentCahnge (pageNum) {
      if (this.pageNum !== 0) {
        this.pageNum = pageNum
      }
      this.queryLisWithPage()
    },
    queryLisWithPage () {
      let param = {}
      param.page = this.pageNum
      param.pre_page = this.pageSize
      Object.assign(param, this.queryData)

      var url = this.url + '?'
      if (this.type === 'get') {
        for (var attr in param) {
          url += attr + '=' + param[attr] + '&'
        }
        param = {}
      }

      this.ajax({
        url: this.type === 'get' ? url : this.url,
        type: this.type,
        data: param,
        success: res => {
          this.pageNum = res.data.page
          this.pageSize = res.data.pre_page
          this.total = parseInt(res.data.total)
          this.$emit('on-query', res)
        }
      })
    }
  }
}
</script>
