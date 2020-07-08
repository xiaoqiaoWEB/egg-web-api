<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
    <div style="padding: 0 70px 0 40px;">
      <el-tree
        style="margin-top: 10px"
        :data="menuList"
        default-expand-all
        :props="defaultProps"
        :default-checked-keys="defaultCheckedKeys"
        show-checkbox
        ref="tree"
        accordion>
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cacel">取 消</el-button>
      <el-button type="primary" @click="submit('form')">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      type: '',
      id: '',
      menuList: [],
      defaultProps: {
        value: '_id',
        children: 'children',
        label: 'menu_name'
      },
      defaultCheckedKeys: []
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    open (obj) {
      this.dialogFormVisible = true
      this.type = obj.type
      this.id = obj.id ? obj.id : ''
      if (this.type === 'menu') {
        this.getMenu()
      }
    },
    getMenu () {
      this.ajax({
        url: '/admin/menu',
        type: 'get',
        success: res => {
          if (res.code === 200) {
            this.menuList = res.data
          }
        }
      })
    },
    cacel () {
      this.formData = {}
      this.dialogFormVisible = false
    },
    submit () {
      var checkedNodeList = this.$refs.tree.getCheckedNodes(true)
      var menu_list = []
      checkedNodeList.forEach(item => {
        menu_list.push(item._id)
      })

      this.ajax({
        url: '/admin/rolemenu',
        data: { role_id: this.id, menu_list },
        success: res => {
          if (res.code === 200) {
            this.dialogFormVisible = false
            this.$message.success('保存成功！')
            this.$emit('success')
          }
        }
      })
    }
  }
}
</script>
