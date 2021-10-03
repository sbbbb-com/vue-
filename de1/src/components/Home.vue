<template>
  <!--home组件-->
  <el-container>
    <!-- 头部区域-->
    <el-header>Header
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!-- 侧边栏-->
      <el-aside width="200px">Aside</el-aside>
      <!-- 右侧主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      // 清除会话保存的 token
      window.sessionStorage.clear()
      //使用跳转到登陆页
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="less" scoped>

.el-header{
  background-color:red ;
}
</style>