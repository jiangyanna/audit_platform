<template>
  <el-container>
  <el-header><h1>审核平台-{{currentPage}}</h1></el-header>
  <el-main>
    <div id="app">
      <router-view></router-view>
    </div>
  </el-main>
</el-container>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      routeMap: {
        'home': '列表页',
        'audit': '审核页'
      }
    }
  },
  computed: {
    currentPage() {
      const route = this.$route.name;
      return this.routeMap[route];
    }
  }
}
</script>

<style>
#app {
  margin-top: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
