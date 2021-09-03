<template>
  <div>
    <h2>我是home页</h2>
    <h2>首页 哈哈哈哈</h2>
    <!--显示子路由-->
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息信息</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>
