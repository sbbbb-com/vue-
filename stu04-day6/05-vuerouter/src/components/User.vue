<template>
<div>
  <h2>用户界面</h2>
  <p>用户的相关信息 哼哼哼</p>

  <h2>{{userId}}</h2>
  <h2>{{$route.params.userId}}</h2>

  <button @click="btnClick">按钮</button>
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
  },
  created() {
    console.log("用户===当组件被创建出来后回调这个函数 created")
  },
  destroyed() {
    console.log("用户====destroyed");
  },
  methods: {
    btnClick(){
      //所有的组件都继承自Vue的原型
      console.log("在user.vue中打印"+this.anName)
      console.log(this.$router);
      console.log(this.$route);
      this.test();
    }
  }
}
</script>

<style scoped>

</style>
