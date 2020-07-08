<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
    <div style="padding: 0 70px 0 40px;">
      <el-form :model="formData" label-width="70px" size="small" ref="form" :rules="rules">
        <el-form-item label="账号：" prop="username">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" v-if="type == 'add'">
          <el-input v-model="formData.password" type="passworld" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="role_id">
          <el-select
            v-model="formData.role_id"
            placeholder="请选择角色"
            filterable
            remote
            :remote-method="remoteMethod"
            style="width: 100%">
            <el-option :label="item.title" :value="item._id" v-for="item in roleList" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机：" prop="mobile">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="formData.status" style="margin-left: -140px;">
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
      roleList: [],
      formData: {
        status: 1
      },
      type: '',
      id: '',
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
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
      this.getRolelist()
    },
    getRolelist () {
      this.ajax({
        url: '/admin/role/list',
        data: {
          pre_page: 10,
          page: 1
        },
        success: res => {
          this.roleList = res.data.list
        }
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.ajax({
          url: '/admin/role/list',
          data: {
            pre_page: 10,
            page: 1,
            title: query
          },
          success: res => {
            this.roleList = res.data.list
          }
        })
      }
    },
    getDetail (id) {
      this.ajax({
        url: `/admin/user/${id}`,
        type: 'get',
        success: res => {
          this.formData.username = res.data.username
          this.formData.role_id = res.data.role_id._id
          this.formData.mobile = res.data.mobile
          this.formData.email = res.data.email
          this.formData.status = res.data.status
          this.roleList.push(res.data.role_id)
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
        url: `/admin/user/${this.id}`,
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
        url: '/admin/user',
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
