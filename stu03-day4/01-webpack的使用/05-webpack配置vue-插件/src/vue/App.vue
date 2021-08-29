<template>
  <div>
    <h2 class="title">{{message}}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{name}}</h2>
    <!--使用组件-->
    <Cpn></Cpn>
  </div>
</template>

<script>
import Cpn from "./Cpn.vue";


export default {
  name: "App",
  components: {
    Cpn //注册进cpn
  },
  data(){
    return　{
      message: "Hello Webpack",
      name: "测试人员"
    }
  },
  methods: {
    btnClick(){
      console.log("btnClick");
    }
  }
}
</script>
<style scoped>
  .title{
    color: green;
}
</style>