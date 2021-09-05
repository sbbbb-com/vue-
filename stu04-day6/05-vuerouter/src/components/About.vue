<template>
  <div>
    <h2>我是关于页</h2>
    <h2>About 哈哈哈哈</h2>
  </div>
</template>

<script>
export default {
  name: "About" ,
  created() {
    console.log("About===当组件被创建出来后回调这个函数 created")
  },
  destroyed() {
    console.log("About====destroyed");
  }
}
</script>

<style scoped>

</style>
