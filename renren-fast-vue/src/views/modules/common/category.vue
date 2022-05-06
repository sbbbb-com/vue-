<template>
  <el-tree
    @node-click="nodeClick"
    ref="menuTree"
    :data="menus"
    :props="defaultProps"
    node-key="catId">

  </el-tree>

</template>

<script>
export default {
  name: 'Category',
  data(){
    // 存储
    return {
      //
      menus: [],
      defaultProps: {
        // 标识 从数据里面取到的 子节点属性
        children: 'children',
        // 表示从数据里面取的为显示的数据
        label: 'name',
      },
      //默认展示的节点
      expandedKey: []
    }
  },
  created () {
    //页面加载完成后获取菜单数据
    this.getMenuData();
  },
  // 方法合集
  methods: {
    //获取菜单数据
    getMenuData () {
      this.$http({
        url: this.$http.adornUrl('/product/category/list/tree'),
        methods: 'get'
      }).then(({data}) => {
        //console.log('成功获取到的数据', data.data)
        // 设置菜单数据
        this.menus = data.data
      })
    },
    // 节点的点击事件
    nodeClick(data,node,component){
      //console.log("子组件节点被点击：",data,node,component)
      //向父组件发送信息
      this.$emit('tree-node-click',/*后面可以携带任意多的参数*/data,node,component)
    }
  }
}
</script>

<style scoped>

</style>
