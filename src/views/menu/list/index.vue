<template>
  <el-card shadow="never">
    <div class="body">
      <div style="width: 398px;">
        <el-card shadow="hover">
          <el-button-group>
            <el-button type="warning" icon="el-icon-circle-close" :disabled="checked">禁用</el-button>
            <el-button type="success" icon="el-icon-edit" :disabled="checked" @click="editMenu">编辑</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" :disabled="checked" @click="addMenu">添加</el-button>
            <el-button type="danger" icon="el-icon-delete" :disabled="checked">删除</el-button>
          </el-button-group>
          <el-tree
            style="margin-top: 10px"
            :data="data"
            default-expand-all
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
          </el-tree>
        </el-card>
      </div>
      <div class="add-edit">
        <el-card shadow="hover" v-if="showEdit">
          <component :is="comName" :data="obj" @success="success"></component>
        </el-card>
      </div>
    </div>
  </el-card>
</template>

<script>
import Add from '../add/index.vue'
import Edit from '../edit/index.vue'
export default {
  data () {
    return {
      checked: true,
      showEdit: false,
      data: [],
      obj: {},
      comName: 'Add',
      defaultProps: {
        children: 'children',
        label: 'menu_name'
      }
    }
  },
  created () {
    this.getMenuList()
  },
  components: {
    Add,
    Edit
  },
  methods: {
    getMenuList () {
      this.ajax({
        url: '/admin/menu',
        type: 'get',
        success: res => {
          if (res.code === 200) {
            this.data = res.data
          }
        }
      })
    },
    handleNodeClick (data) {
      this.checked = false
      console.log(this.checked)
      this.obj = data
    },
    addMenu () {
      this.comName = 'Add'
      this.showEdit = true
    },
    editMenu () {
      this.showEdit = true
      this.comName = 'Edit'
    },
    success () {
      this.showEdit = false
      this.getMenuList()
    }
  }
}
</script>

<style lang="scss" scoped>
.body{
  display: flex;
}
.add-edit{
  flex: 1;
  margin-left: 15px;
}
.el-button{
  border-radius: 0;
  border-right: 1px solid #ffffff;
}
.el-button+.el-button{
  margin-left: 0;
  border-radius: 0;
}
</style>
