<template>
  <div id="app">
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
/*在style中引用外部文件*/
@import url("../../assets/css/base.css");

/*设置几个div为水平分布*/
#tab-bar{
  display: flex;
  background-color: #f6f6f6;

  position: fixed; /*开启定位*/
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
}


</style>
