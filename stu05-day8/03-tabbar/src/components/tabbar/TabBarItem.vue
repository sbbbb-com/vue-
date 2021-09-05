<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //自定义属性  用来接收路径变量
  props: {
    path: String
  },
  data() {
    return {
      isActive: true
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
