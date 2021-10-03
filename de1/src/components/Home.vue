<template>
<div>
<!--home组件-->11home组件
  <el-button type="info" @click="logout">退出</el-button>
</div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout(){
      // 清除会话保存的 token
      window.sessionStorage.clear()
      //使用跳转到登陆页
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="less" scoped>


</style>