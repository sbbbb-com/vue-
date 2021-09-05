<template>
  <div>
    <h2>我是home页</h2>
    <h2>首页 哈哈哈哈</h2>
    <!--显示子路由-->
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息信息</router-link>

    <router-view></router-view>

    <h2>{{message}}</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      message:　"你好世界",
      path: '/home/news'
    }
  },
  //生命周期  当组件被创建出来后回调这个函数 created
  created() {
    console.log("当组件home被创建 created")

    //document.title='首页';
  },
  /*//生命周期  当创建的template挂载到dom后 回调这个函数 mounted
  mounted() {
    console.log("生命周期  当创建的template挂载到dom后 回调这个函数 mounted");
  },
  //生命周期  当界面发生更新/刷新 【】后执行的函数 updated
  updated() {
    console.log("生命周期  当界面发生更新/刷新 【】后执行的函数 updated");
  }*/
  //生命周期函数 被销毁
  destroyed() {
    console.log("home被销毁  destroyed");
  },
  /**
   * 下面两个函数 activated 与 deactivated
   * 只要改组件被保持了状态使用了 keep-alive时，才是有效的
   */
  //当界面进入活跃状态触发的函数
  activated() {
    //this.$router.push(this.path);
    console.log("activated");
  },
  //当界面进入不活跃状态时候触发的函数
  deactivated() {
    console.log("deactivated");
    // // 此时的 ￥route是跳转后的
    // this.path=this.$route.path;
  },
  beforeRouteLeave(to,from,next){
    //导航离开该组件的对应路由时调用
    console.log(this.$route.path);
    this.path=this.$route.path;
    next();
  }

}
</script>

<style scoped>

</style>
