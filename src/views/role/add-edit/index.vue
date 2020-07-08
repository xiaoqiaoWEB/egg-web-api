<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
    <div style="padding: 0 70px 0 40px;">
      <el-form :model="formData" label-width="120px" size="small" ref="form" :rules="rules">
        <el-form-item label="角色名称：" prop="title">
          <el-input v-model="formData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色简介：" prop="description">
          <el-input v-model="formData.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="formData.status" style="margin-left: -100px;">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
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
      formData: {
        status: 1
      },
      type: '',
      id: '',
      rules: {
        title: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2 到 30 个字符', trigger: 'blur' }
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
      }
    },
    getDetail (id) {
      this.ajax({
        url: `/admin/role/${id}`,
        type: 'get',
        success: res => {
          this.formData = res.data
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
            this.sendAddData()
          }
        }
      })
    },
    sendEditData () {
      this.ajax({
        url: `/admin/role/${this.id}`,
        type: 'post',
        data: this.formData,
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
      this.ajax({
        url: '/admin/role',
        type: 'put',
        data: this.formData,
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
