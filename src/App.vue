<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 56px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  // height: calc(100vh - 56px);
}
.container{
  background-color: rgba(0, 0, 0, 0.05) !important;
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  margin: 10px !important;
  padding: 15px !important;
  //height: calc(100vh - 56px);
  //width: calc(100vw - 200px);
}

</style>
