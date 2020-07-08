<template>
    <el-container class="hc-content">
      <el-header>Header</el-header>
      <el-container class="hx-cotainer">
        <el-aside width="200px">
          <Silde></Silde>
        </el-aside>
        <el-container class="container">
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
</template>

<script>
import Silde from './silde.vue'
export default {
  components: {
    Silde
  }
}
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.hx-cotainer{
  display: flex;
}
.hc-content{
  height: 100vw;
}
</style>
