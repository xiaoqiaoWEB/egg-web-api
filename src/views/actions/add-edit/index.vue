<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
    <div style="padding: 0 60px 0 30px;">
      <el-form :model="formData" label-width="100px" size="small" ref="form" :rules="rules">
        <el-form-item label="权限菜单：" prop="menuIdList" v-if="type === 'add'">
          <el-cascader
            :options="menuList"
            style="width: 100%"
            :props="menuProps"
            filterable
            v-model="formData.menuIdList"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="权限菜单：" prop="action_name" v-if="type == 'edit'">
          <el-input v-model="formData.menu_name" autocomplete="off" :disabled="type === 'edit' "></el-input>
        </el-form-item>
        <el-form-item label="权限名称：" prop="action_name">
          <el-input v-model="formData.action_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码：" prop="action_code">
          <el-input v-model="formData.action_code" autocomplete="off" :disabled="type === 'edit' "></el-input>
        </el-form-item>
        <el-form-item label="URL路径：" prop="url">
          <el-input v-model="formData.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="formData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="formData.status" style="margin-left: -140px;">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cacel">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      menuList: [],
      formData: {
        status: 1
      },
      menuProps: {
        value: '_id',
        label: 'menu_name',
        children: 'children'
      },
      type: '',
      id: '',
      rules: {
        action_name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        action_code: [
          { required: true, message: '请输入权限编码', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入权限路径', trigger: 'blur' }
        ]
      }
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
      if (this.id) {
        this.getDetail(this.id)
      } else {
        this.getMenu()
      }
    },
    getMenu () {
      this.ajax({
        url: '/admin/menu',
        type: 'get',
        success: res => {
          this.menuList = res.data
        }
      })
    },
    getDetail (id) {
      this.ajax({
        url: `/admin/action/${id}`,
        type: 'get',
        success: res => {
          this.formData = res.data
          this.formData.menu_name = this.formData.menu_id.menu_name
        }
      })
    },
    cacel () {
      this.formData = {}
      this.dialogFormVisible = false
    },
    submit (name) {
      this.$refs[name].validate((vaild) => {
        if (vaild) {
          if (this.type === 'edit') {
            this.sendEditData()
          } else {
            if (this.formData.menuIdList.length) {
              this.sendAddData()
            } else {
              this.$message.error('请选择权限菜单！')
            }
          }
        }
      })
    },
    sendEditData () {
      const { action_name, url, status, remark } = this.formData
      this.ajax({
        url: `/admin/action/${this.id}`,
        type: 'post',
        data: { action_name, url, status, remark },
        success: res => {
          if (res.code === 200) {
            this.dialogFormVisible = false
            this.formData = {}
            this.$message('修改成功！')
            this.$emit('success')
          }
        }
      })
    },
    sendAddData () {
      this.formData.menu_id = this.formData.menuIdList[this.formData.menuIdList.length - 1]
      const { action_name, action_code, status, url, menu_id, remark } = this.formData
      this.ajax({
        url: '/admin/action',
        type: 'put',
        data: { action_code, action_name, status, url, menu_id, remark },
        success: res => {
          if (res.code === 200) {
            this.dialogFormVisible = false
            this.formData = {}
            this.$message('添加成功！')
            this.$emit('success')
          }
        }
      })
    }
  }
}
</script>
