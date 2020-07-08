<template>
  <div>
    <el-form :model="formData" label-width="120px" size="small" ref="form" :rules="rules">
      <el-form-item label="上级菜单：">
        <el-input v-model="data.menu_name" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="菜单名称：" prop="menu_name">
        <el-input v-model="formData.menu_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单编码：" prop="menu_code">
        <el-input v-model="formData.menu_code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单icon：" prop="icon">
        <el-input v-model="formData.icon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址：" prop="url">
        <el-input v-model="formData.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单排序：" prop="sort">
        <el-input v-model="formData.sort" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单备注：" prop="remark">
        <el-input v-model="formData.remark" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="formData.status" style="margin-left: -100px;">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submit('form')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      formData: {
        status: 1
      },
      rules: {
        menu_name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        menu_code: [
          { required: true, message: '请输入菜单编码', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入菜单地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (name) {
      this.$refs[name].validate((vaild) => {
        if (vaild) {
          this.sendAddData()
        }
      })
    },
    sendAddData () {
      const newData = Object.assign({ pid: this.data._id }, this.formData)
      this.ajax({
        url: '/admin/menu',
        type: 'put',
        data: newData,
        success: res => {
          if (res.code === 200) {
            this.$message('添加成功！')
            this.$emit('success')
          }
        }
      })
    }
  }
}
</script>
