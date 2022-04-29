<template>
  <div>
    <el-tree
      :draggable="true"
      :allow-drop="allowDrop"
      :default-expanded-keys="expandedKey"
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
          <el-button
            type="text"
            size="mini"
            @click="() => edit(data)">
            修改
          </el-button>
        </span>
      </span>
    </el-tree>

    <!--对话框-->
    <el-dialog
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="category">
        <el-form-item label="分类名称" >
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" >
          <el-input v-model="category.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计量单位" >
          <el-input v-model="category.productUnit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      title: "",
      dialogType: "", //edit add
      memus: [],
      defaultProps: {
        // 标识 从数据里面取到的 子节点属性
        children: 'children',
        // 表示从数据里面取的为显示的数据
        label: 'name',
      },
      //默认展示的节点
      expandedKey: [],
      // 对话框 默认关闭
      dialogVisible: false,
      // 弹出对话框中表格的数据
      formLabelWidth: '120px',
      //表单 数据绑定
      category: {
        name: "",
        parentCid:　0,
        catLevel: 0,
        showStatus: 1,
        sort:　0,
        catId: null,
        productUnit: null,
        icon: null,
      }
    }
  },
  created () {
    // 在页面创建完成后 加载数据
    this.getMenuData()
  },
  methods: {
    //获取菜单数据
    getMenuData () {
      this.$http({
        url: this.$http.adornUrl('/product/category/list/tree'),
        methods: 'get'
      }).then(({data}) => {
        //console.log('成功获取到的数据', data.data)
        // 设置菜单数据
        this.memus = data.data
      })
    },
    // 节点添加
    append (data) {
      //console.log('点击添加按钮', data)
      // 打开对话框
      this.dialogType="add"
      this.title="添加分类数据"
      this.dialogVisible = true;
      this.category.parentCid=data.catId;
      this.category.catLevel=data.catLevel*1+1;
      // 先让表单 设置 默认值
      this.category.name=""
      this.category.catId=null
      this.category.icon=""
      this.category.sort=0
      this.category.showStatus=1
      this.category.productUnit=""

    },
    edit(data){
      //console.log("修改",data);
      this.dialogType="edit"
      this.title="修改分类数据"
      this.dialogVisible=true

      //发送请求 获取当前节点的最新数据
      this.$http({
        url: this.$http.adornUrl(`/product/category/info/${data.catId}`),
        method: "get",
      }).then(({data})=>{
        //请求成功 回显数据
        console.log("返回数值：",)
        this.category.name=data.data.name
        this.category.catId=data.data.catId
        this.category.icon=data.data.icon
        this.category.productUnit=data.data.productUnit
        //回显父菜单
        this.category.parentCid=data.data.parentCid
      })

    },
    // 提交数据 判断 是提交还是修改
    submitData(){
      if (this.dialogType==="add"){
        this.addCategory();
      }

      if (this.dialogType==="edit"){
        this.editCategory();
      }
    },
    //修改三级分类菜单的方法
    editCategory(){
      //定义发送的临时变量
      let {catId,name,icon,productUnit}=this.category

      this.$http({
        url:　this.$http.adornUrl("/product/category/update"),
        method:　"post",
        data: this.$http.adornData({catId,name,icon,productUnit},false)
      }).then(({data})=>{
        this.$message({
          message:　"菜单修改成功",
          type: 'success'
        });
        //后续操作
        //关闭对话框
        this.dialogVisible=false
        //重新请求数据
        this.getMenuData();
        //打开节点 保存数据的三级菜单父菜单的分类
        this.expandedKey=[this.category.parentCid]
      })
    },
  //添加三级分类
  addCategory(){
    console.log("提交的数据",this.category)
    //发起请求
    this.$http({
      url: this.$http.adornUrl("/product/category/save"),
      method: "post",
      data:this.$http.adornData(this.category,false)
    }).then(({data})=>{
      this.$message({
        message:　"菜单保存成功",
        type: 'success'
      });
      //关闭对话框
      this.dialogVisible=false
      //重新请求数据
      this.getMenuData();
      //打开节点 保存数据的三级菜单父菜单的分类
      this.expandedKey=[this.category.parentCid]
    })
  },
    // 节点删除
    remove (node, data) {
      //在正式删除前进行弹窗提示：
      this.$confirm(`是否删除【${data.name}】菜单？`, '警告！！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        let ids = [data.catId]
        //console.log("点击删除按钮",node,data)
        this.$http({
          url: this.$http.adornUrl('/product/category/delete'),
          method: 'POST',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          //console.log("删除成功...",data)
          //删除成功后提示消息
          this.$message({
            type: 'success',
            message: '菜单删除成功!'
          })
          //删除后刷新数据
          this.getMenuData()
          // 设置需要默认展开的菜单
          this.expandedKey = [node.parent.data.catId]
        })

      }).catch((er) => {
      })
    },
    // 节点拖拽
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
  }
}
</script>

<style scoped>

</style>
