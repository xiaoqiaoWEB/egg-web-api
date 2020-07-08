<template>
  <el-card shadow="never">
    <div slot="header">
      <div style="text-align: right;">
        <el-form :inline="true" :model="formData" class="demo-form-inline" size="small">
          <el-form-item >
            <el-input v-model="formData.title" placeholder="角色名称" clearable></el-input>
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
            <el-button @click="addAdmin">添加角色</el-button>
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
        <el-table-column prop="title" label="角色名称"></el-table-column>
        <el-table-column prop="description" label="角色简介"></el-table-column>
        <el-table-column prop="added_by" label="添加者">
          <template slot-scope="scope">
            <span>{{scope.row.added_by ? scope.row.added_by.username  : ''}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span :style="{'color': scope.row.status === 1 ? '' : 'red'}">
              {{scope.row.status | getUserStatus}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" plain @click="accwssMenu(scope.row._id)" size="mini">菜单</el-button>
               <el-button type="success" plain @click="editUser(scope.row._id)" size="mini">权限</el-button>
              <el-button type="info" plain @click="editUser(scope.row._id)" size="mini">编辑</el-button>
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
    <!-- role access -->
    <AccessMenu ref="accessMenu" :title="title" @success="success"></AccessMenu>
  </el-card>
</template>

<script>
import PagePanel from '../../../components/pagination/index.vue'
import AddEdit from '../../role/add-edit/index.vue'
import AccessMenu from '../../role/menu/index.vue'
export default {
  data () {
    return {
      tableData: [],
      formData: {},
      pageUrl: {
        pageUrl: '/admin/role/list'
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
    AddEdit,
    AccessMenu
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
      this.$confirm('此操作将永久删除该角色, 是否继续?', '删除角色', {
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
        url: `/admin/role/${id}`,
        type: 'delete',
        success: res => {
          if (res.code === 200) {
            this.$message.success('删除成功！')
            this.success()
          }
        }
      })
    },
    accwssMenu (id) {
      this.title = '授权菜单'
      this.$refs.accessMenu.open({
        type: 'menu',
        id
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
