<template>
  <div>
    <el-tree :data="memus" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      memus: [],
      defaultProps: {
        // 标识 从数据里面取到的 子节点属性
        children: 'children',
        // 表示从数据里面取的为显示的数据
        label: 'name'
      }
    }
  },
  created () {
    // 在页面创建完成后 加载数据
    this.getMenuData();
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    //获取菜单数据
    getMenuData(){
      this.$http({
        url: this.$http.adornUrl("/product/category/list/tree"),
        methods: 'get'
      }).then(({data})=>{
        console.log("成功获取到的数据",data.data)
        // 设置菜单数据
        this.memus=data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
