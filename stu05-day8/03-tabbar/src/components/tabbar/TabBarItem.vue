<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div  :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //自定义属性  用来接收路径变量
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      //底部活动的状态
      //isActive: true
    }
  },
  //使用计算属性 改变底部活动的状态
  computed: {
    isActive(){
      //this.$route 那一个路由活跃就是拿到哪一个路由对象
      /*indexOf(this.path) 判读拿到的路由对象里面是否有当前的路由对象
       *indexOf（）方法返回第一次出现指定值的调用字符串对象内的索引，
      * 从fromIndex开始搜索。如果找不到该值，则返回-1
       */
      return this.$route.path.indexOf(this.path)!==-1;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} :{};
    }
  },
  methods: {
    //监听组件的点击事件
    itemClick(){
      //解决点击重复报错问题
      this.$router.push('/location').catch(error=>{
        console.log(error);})
      //根据获取到的自定义属性 即：path路径 跳转到指定path
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>

.tab-bar-item {
  flex: 1;
  text-align: center;
  /*一般 tab-bar为49*/
  height: 49px;
  font-size: 14px;

}

/*设置此元素中图片大小*/
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;

  margin-bottom: 2px;
}

.active {
  color: #a10c4e;
}
</style>
