<template>
  <el-menu
    default-active="$route.name"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handelSelete"
    background-color="rgba(0,0,0,0)"
    text-color="#ffffff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="userList" :route="{name: 'userList'}">用户管理</el-menu-item>
        <el-menu-item index="roleList" :route="{name: 'roleList'}">角色管理</el-menu-item>
        <el-menu-item index="actionList" :route="{name: 'actionList'}">权限管理</el-menu-item>
        <el-menu-item index="menuList" :route="{name: 'menuList'}">菜单管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handelSelete (index, indexPath) {
      console.log(indexPath)
      this.loadPage(indexPath[1])
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu{
  border-right: none;
}
li.el-menu-item:hover{
  background: #053a8f !important;
}
.el-submenu .el-submenu__title:hover{
  background: #053a8f !important;
}
</style>
