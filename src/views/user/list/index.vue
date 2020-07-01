<template>
  <el-card shadow="never">
    <div slot="header">
      title
    </div>
    <div class="body">
      <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column prop="add_time" label="添加日期"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" plain @click="show(scope.row._id)" size="mini">详情</el-button>
              <el-button type="success" plain @click="loadPage('userAdd', {id: scope.row._id})" size="mini">编辑</el-button>
              <el-button type="danger" plain @click="show(scope.row._id)" size="mini">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="padding-top: 30px;">
      <PagePanel ref="pagePanel" :url="pageUrl.pageUrl" :queryData="formData" @on-query="queryCallBack"></PagePanel>
    </div>
  </el-card>
</template>

<script>
import PagePanel from '../../../components/pagination/index.vue'
export default {
  data () {
    return {
      tableData: [],
      formData: {},
      pageUrl: {
        pageUrl: '/admin/user'
      }
    }
  },
  components: {
    PagePanel
  },
  methods: {
    queryCallBack (res) {
      this.tableData = res.data.list
    }
  }
}
</script>
