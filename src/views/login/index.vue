<template>
  <div class="hx-login">
    <el-card class="login-card">
      <div slot="header">系统管理登陆</div>
      <div style="padding-right: 30px; padding-top: 15px;">
        <el-form :model="loginData" label-width="70px" size="medium" ref="login" :rules="rules">
          <el-form-item label="账号：" prop="username">
            <el-input v-model.trim="loginData.username" autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model.trim="loginData.password" autofocus="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" :loading="loading" @click="login('login')">登陆</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      loginData: {},
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
  methods: {
    login (name) {
      this.$refs[name].validate((vaild) => {
        if (vaild) {
          this.sendLoginData()
        }
      })
    },
    sendLoginData () {
      this.ajax({
        url: '/admin/login',
        data: this.loginData,
        success: res => {
          if (res.code === 200) {
            this.$store.dispatch('update_auth_token', res.data)
            this.loadPage('userList')
          }
        },
        errCallBack: err => {
          console.log(err)
          this.loginData = {}
        }
      })
    }
  }
}
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
  .hx-login{
    width: 100%;
    height: 100%;
    background: url('../../assets/bj.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
  }
  .login-card{
    width: 420px;
    position: absolute;
    left: 50%;
    margin-left: -230px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
