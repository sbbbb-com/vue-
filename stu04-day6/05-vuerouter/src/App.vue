<template>
  <div id="app">
    <!--
    replace 设置禁止返回
    active-class="" 设置点击触发后附加的属性
    -->
<!--    <router-link to="/home" tag="button" replace active-class="my-active">
      首页
    </router-link>
    <router-link to="/about" tag="button" replace active-class="my-active">
      关于
    </router-link>-->

<!--    <router-link to="/home" tag="button" replace  >
      首页
    </router-link>
    <router-link to="/about" tag="button" replace  >
      关于
    </router-link>

    <hr />
    <h3>上面</h3>
    <router-view></router-view>
    <h4>下面</h4>-->
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>

    <router-view></router-view>

  </div>
</template>

<script>
import Home from "./components/Home";
export default {
  name: 'App',
  methods: {
    homeClick(){
      console.log('homeClick');
      //通过代码修改路由 vue-router 调用vue路由自定义对象去操纵
      //this.$router.push('/home');
      this.$router.replace('/home');
    },
    aboutClick(){
      console.log('aboutClick');
      //this.$router.push('/about');
      this.$router.replace('/about');
    }

  }
}
</script>

<style>
h3,h4{
  background: red;

}

.active{
  color: #e3e3ef;
  background: #2c3e50;
}
</style>
