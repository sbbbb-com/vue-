<template>
<div>
  <h2>{{$store.state.counter}}</h2>

  <h2>-----------App的内容 Getters相关信息-----------</h2>
  <h2>{{$store.getters.powerCounter}}</h2>
  <h2>----------拿到所有学生----------</h2>
  <ul>
    <li v-for="item in $store.getters.more20stu">{{item}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: "HelloVuex",
  //引用父类组件
 /* props: {
    counter: Number
  }*/
}
</script>

<style scoped>
h2{
  background: #42b983;
}
</style>
