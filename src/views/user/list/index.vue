<template>
  <el-card shadow="never">
    <div slot="header">
      <div style="text-align: right;">
        <el-form :inline="true" :model="formData" class="demo-form-inline" size="small">
          <el-form-item >
            <el-input v-model="formData.username" placeholder="用户" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formData.status" placeholder="用户状态" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-button @click="addAdmin">添加用户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="body">
      <el-table :data="tableData" stripe style="width: 100%;" size="small">
        <el-table-column prop="add_time" label="添加日期">
          <template slot-scope="scope">
            <span>
              {{formatDate(scope.row.add_time, 'yyyy-MM-dd hh:mm')}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="role_id" label="用户角色">
          <template slot-scope="scope">
            <span>
              {{scope.row.role_id ? scope.row.role_id.title : ''}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span :style="{'color': scope.row.status === 1 ? '' : 'red'}">
              {{scope.row.status | getUserStatus}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="success" plain @click="editUser(scope.row._id)" size="mini">编辑</el-button>
              <el-button type="danger" plain @click="removeUser(scope.row._id)" size="mini" slot="reference">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="padding-top: 30px;">
      <PagePanel ref="pagePanel" :url="pageUrl.pageUrl" :queryData="formData" @on-query="queryCallBack"></PagePanel>
    </div>
    <!-- 添加编辑 -->
    <AddEdit ref="addEdit" :title="title" @success="success"></AddEdit>
  </el-card>
</template>

<script>
import PagePanel from '../../../components/pagination/index.vue'
import AddEdit from '../../user/add-edit/index.vue'
export default {
  data () {
    return {
      tableData: [],
      formData: {},
      pageUrl: {
        pageUrl: '/admin/user/list'
      },
      title: '编辑管理员',
      options: [
        { value: 1, label: '启用' },
        { value: 2, label: '禁用' }
      ]
    }
  },
  components: {
    PagePanel,
    AddEdit
  },
  methods: {
    queryCallBack (res) {
      this.tableData = res.data.list
    },
    success () {
      this.$refs.pagePanel.queryLisWithPage()
    },
    onSubmit () {
      this.$refs.pagePanel.queryLisWithPage()
    },
    editUser (id) {
      this.title = '编辑管理员'
      this.$refs.addEdit.open({
        type: 'edit',
        id
      })
    },
    addAdmin () {
      this.title = '编辑管理员'
      this.$refs.addEdit.open({
        type: 'add'
      })
    },
    removeUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteUser(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteUser (id) {
      this.ajax({
        url: `/admin/user/${id}`,
        type: 'delete',
        success: res => {
          if (res.code === 200) {
            this.$message.success('删除成功！')
            this.success()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item{
  margin-bottom: 0;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 0;
}
.el-table thead{
  color: #07275b !important;
}
</style>
