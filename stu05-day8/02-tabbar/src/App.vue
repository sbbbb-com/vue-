<template>
  <div id="app">
    <div id="tab-bar">
      <div class="tab-bar-item">首页</div>
      <div class="tab-bar-item">分类</div>
      <div class="tab-bar-item">购物车</div>
      <div class="tab-bar-item">我的</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*在style中引用外部文件*/
@import url("./assets/css/base.css");

/*设置几个div为水平分布*/
#tab-bar{
  display: flex;
  background-color: #f6f6f6;

  position: fixed; /*开启定位*/
  left: 0;
  right: 0;
  bottom: 0;

}

.tab-bar-item{
  flex: 1;
  text-align: center;
  /*一般 tab-bar为49*/
  height: 49px;

  box-shadow: 0 -3px 1px  rgba(100,100,100,0.08);
}

</style>
