<template>
  <div class="tab-bar-item">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
    <!--
    <img src="../../assets/img/tabbar/home.svg">
     <div>首页</div>
     -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem"
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
</style>
