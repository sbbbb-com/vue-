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
    <!--    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>-->
    <router-link to="/home" replace >首页</router-link>
    <router-link to="/about" replace >关于</router-link>
<!--  <router-link to="/profile" >档案</router-link>-->
<!--
    <router-link v-bind:to="{path: '/profile',query: {name: '嘿嘿',age: 48,height: 1.88}}">
      档案
    </router-link>
    <router-link  v-bind:to="'/user/'+userId" replace>用户</router-link>-->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>


    <!--
    exclude -字符串或正则表达式，任何匹配的组件都不会被缓存
    router-view也是一个组件，如果直接被包在keep-alive里面，所有路径匹配到的视图组件都会被缓存
    排除的组件，使其每一次都重新加载
    不要在exclude后面随便加空格
    -->
    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Home from "./components/Home";
export default {
  name: 'App',
  data(){
    return {
      userId: 'li_si'
    }
  },
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
    },

    userClick(){
      this.$router.push('/user/'+this.userId);
    },
    profileClick(){
      this.$router.push({
        path: '/profile',
        query: {
          name: '特殊人员',
          age: 15,
          height: 1.88
        }
      });
    }
  }
}
</script>

<style>
h3,h4{
  background: red;

}

.active{
  color: #ec0b0b;
  background: #3f502c;
}
</style>
