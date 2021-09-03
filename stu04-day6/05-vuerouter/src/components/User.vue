<template>
<div>
  <h2>用户界面</h2>
  <p>用户的相关信息 哼哼哼</p>

  <h2>{{userId}}</h2>
  <h2>{{$route.params.userId}}</h2>
</div>
</template>

<script>
export default {
  name: "User",
  //计算属性
  computed: {
    userId(){
      return this.$route.params.userId;
    }
  }
}
</script>

<style scoped>

</style>
