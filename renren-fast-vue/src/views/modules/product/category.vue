<template>
  <div>
    <el-tree
      :data="memus"
      :props="defaultProps"
      show-checkbox
      node-key="catId"
      :expand-on-click-node="false">
       <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="node.childNodes.length>0"
            type="text"
            size="mini"
            @click="() => append(data)">
            添加
          </el-button>
          <el-button
            v-if="node.childNodes.length===0"
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
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
    },
    // 节点添加
    append(data) {
      console.log("点击添加按钮",data)
    },
    // 节点删除
    remove(node, data) {
      //在正式删除前进行弹窗提示：
      this.$confirm(`是否删除【${data.name}】菜单？`, '警告！！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        let ids=[data.catId]
        //console.log("点击删除按钮",node,data)
        this.$http({
          url: this.$http.adornUrl("/product/category/delete"),
          method: "POST",
          data: this.$http.adornData(ids,false)
        }).then(({data})=>{
          //console.log("删除成功...",data)
          //删除后刷新数据
          this.getMenuData();
        })

        //删除成功后提示消息
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch((er)=>{
        })
    },
  }
}
</script>

<style scoped>

</style>
