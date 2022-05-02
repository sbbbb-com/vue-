<template>
  <div>
    <el-switch
      v-model="draggable"
      active-text="开启拖拽"
      inactive-text="关闭拖拽">
    </el-switch>
    <el-button v-if="draggable" @click="batchSave">批量保存</el-button>
    <el-button type="danger" icon="el-icon-delete" circle @click="batchDelete"></el-button>
    <el-tree
      ref="menuTree"
      :draggable="draggable"
      :allow-drop="allowDrop"
      @node-drop="handleDrop"
      :default-expanded-keys="expandedKey"
      :data="menus"
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
        <el-form-item label="分类名称">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="category.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
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
      //
      pCid:[],
      //是否开启拖拽
      draggable: false,
      // 需要更新的节点对象
      updateNodes:[],
      // 统计最大层级 默认是1
      maxLevel: 0,
      title: '',
      dialogType: '', //edit add
      menus: [],
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
        name: '',
        parentCid: 0,
        catLevel: 0,
        showStatus: 1,
        sort: 0,
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
    // 批量删除节点
    batchDelete(){
      //临时保存删除节点的id值
      let  catIds=[]
      let  catIdName=[]
      let checkedNodes = this.$refs.menuTree.getCheckedNodes()
      console.log("打印要删除选中的元素：",checkedNodes)
      for (let i = 0; i < checkedNodes.length; i++) {
        catIds.push(checkedNodes[i].catId);
        catIdName.push(checkedNodes[i].name);
      }

      this.$confirm(`是否批量删除【${catIdName}】菜单？`, '警告！！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        // 发送删除的网络请求
        this.$http({
          url: this.$http.adornUrl("/product/category/delete"),
          method: "post",
          data: this.$http.adornData(catIds,false)
        }).then(({data})=>{
          console.log("删除成功",data)
          //给出提示信息
          this.$message({
            message: "批量删除成功",
            type: "success"
          })
          //刷新菜单
          this.getMenuData();
        })

      }).catch(()=>{

      })
    },
    //批量保存数据
    batchSave(){
      this.$http({
        url: this.$http.adornUrl("/product/category/update/sort"),
        method: "post",
        data: this.$http.adornData(this.updateNodes,false)
      }).then(({data})=>{
        //给出提示信息
        this.$message({
          message: "菜单修改成功",
          type: "success"
        })
        //刷新菜单
        this.getMenuData()//重新请求数据
        //打开节点 设置为默认展开的菜单  他被拖拽到哪个父id里面
        this.expandedKey = this.pCid

        // 每次拖拽成功后  清空保存的节点值
        // 清空需要更新的节点对象
        this.updateNodes=[];
        // 清空统计最大层级 默认是0
        this.maxLevel=0;
        //this.pCid=0;
      })
    },
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
    // 节点添加
    append (data) {
      //console.log('点击添加按钮', data)
      // 打开对话框
      this.dialogType = 'add'
      this.title = '添加分类数据'
      this.dialogVisible = true
      this.category.parentCid = data.catId
      this.category.catLevel = data.catLevel * 1 + 1
      // 先让表单 设置 默认值
      this.category.name = ''
      this.category.catId = null
      this.category.icon = ''
      this.category.sort = 0
      this.category.showStatus = 1
      this.category.productUnit = ''

    },
    edit (data) {
      //console.log("修改",data);
      this.dialogType = 'edit'
      this.title = '修改分类数据'
      this.dialogVisible = true

      //发送请求 获取当前节点的最新数据
      this.$http({
        url: this.$http.adornUrl(`/product/category/info/${data.catId}`),
        method: 'get',
      }).then(({data}) => {
        //请求成功 回显数据
        console.log('返回数值：',)
        this.category.name = data.data.name
        this.category.catId = data.data.catId
        this.category.icon = data.data.icon
        this.category.productUnit = data.data.productUnit
        //回显父菜单
        this.category.parentCid = data.data.parentCid
      })

    },
    // 提交数据 判断 是提交还是修改
    submitData () {
      if (this.dialogType === 'add') {
        this.addCategory()
      }

      if (this.dialogType === 'edit') {
        this.editCategory()
      }
    },
    //修改三级分类菜单的方法
    editCategory () {
      //定义发送的临时变量
      let {catId, name, icon, productUnit} = this.category

      this.$http({
        url: this.$http.adornUrl('/product/category/update'),
        method: 'post',
        data: this.$http.adornData({catId, name, icon, productUnit}, false)
      }).then(({data}) => {
        this.$message({
          message: '菜单修改成功',
          type: 'success'
        })
        //后续操作
        //关闭对话框
        this.dialogVisible = false
        //重新请求数据
        this.getMenuData()
        //打开节点 保存数据的三级菜单父菜单的分类
        this.expandedKey = [this.category.parentCid]
      })
    },
    //添加三级分类
    addCategory () {
      console.log('提交的数据', this.category)
      //发起请求
      this.$http({
        url: this.$http.adornUrl('/product/category/save'),
        method: 'post',
        data: this.$http.adornData(this.category, false)
      }).then(({data}) => {
        this.$message({
          message: '菜单保存成功',
          type: 'success'
        })
        //关闭对话框
        this.dialogVisible = false
        //重新请求数据
        this.getMenuData()
        //打开节点 保存数据的三级菜单父菜单的分类
        this.expandedKey = [this.category.parentCid]
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
    /**
     *
     * @param draggingNode 当前节点
     * @param dropNode 这是放到那个节点的
     * @param type 这是他放到了那个位置
     * @returns {boolean}
     */
    allowDrop (draggingNode, dropNode, type) {
      // 1.被拖动的当前节点以及所在的父节点总层数不能大于3
      // 1）被拖动的当前节点总层数
      let level = this.countNodeLevel(draggingNode)
      // 当前正在拖动的节点加上父节点所在深度不大于3即可
      // console.log("节点深度大小为：",level)
      //  深度 = (最深深度 - 当前深度) + 1
      let deep=Math.abs(this.maxLevel-draggingNode.level)+1
      this.maxLevel=0

      //console.log("节点深度大小为：",deep)
      // 对能不能拖进行判断
      if (type==="inner"){
        return  deep+dropNode.level<=3
      }else {
        return  (deep+dropNode.parent.level<=3)
      }

    },
    /**
     * 计算节点数目
     * @param node
     * @returns {undefined}
     */
    countNodeLevel (node) {
      // 遍历所有子节点 求出深度最大值
      if (node.childNodes!=null && node.childNodes.length>0){
        for (let i = 0; i < node.childNodes.length; i++) {
          // 遍历子节点值
          if (node.childNodes[i].level>this.maxLevel){
            this.maxLevel=node.childNodes[i].level
          }

          //对子节点的子节点进行递归遍历
          this.countNodeLevel((node.childNodes[i]))
        }
      }
      return this.maxLevel
    },
    /**
     * 更新所有子节点的层级
     * @param node
     */
    updateChildrenNodeLevel(node){
      if (node.childNodes.length> 0){
        for (let i = 0; i < node.childNodes.length; i++) {
          let  cNode=node.childNodes[i].data;
          this.updateNodes.push({catId: cNode.catId,catLevel: node.childNodes[i].level})
          // 递归将处理的节点递归传入进去
          this.updateChildrenNodeLevel(node.childNodes[i])
        }
      }
    },
    /**
     * 	拖拽成功完成时触发的事件
     * @param draggingNode  被拖拽节点对应的 Node
     * @param dropNode 结束拖拽时最后进入的节点
     * @param dropType 被拖拽节点的放置位置（before、after、inner）
     * @param ev event
     */
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('handleDrop： ',draggingNode,dropNode,dropType);
      // 1.知道当前节点的最新父节点id
      let pCid=0;
      let siblings=[]
      if (dropType==="before" || dropType=== "after"){
        pCid=dropNode.parent.data.catId === undefined ? 0 :dropNode.parent.data.catId ;
        siblings=dropNode.parent.childNodes;
      }else {
        pCid=dropNode.data.catId;
        siblings=dropNode.childNodes;
      }

      this.pCid.push(pCid);

      //2. 当前拖拽节点的最新顺序
      for (let i = 0; i < siblings.length; i++) {
        if (siblings[i].data.catId===draggingNode.data.catId){
          //如果遍历的是当前正在拖拽的节点
          let catLevel=draggingNode.level; //当前节点的默认层级
          if (siblings[i].level !==draggingNode.level){
            // 当前的层级发生改变
            catLevel=siblings[i].level;
            // 修改子节点的层级
            this.updateChildrenNodeLevel(siblings[i]);
          }
          this.updateNodes.push({catId:siblings[i].data.catId, sort: i, parentCid: pCid,catLevel:catLevel})
        }else {
          this.updateNodes.push({catId:siblings[i].data.catId, sort: i});
        }
      }
      // 当前拖拽节点的最新层级
      console.log("updateNodes",this.updateNodes)
      // 将整理好元素发送请求到后端修改

      //修改全局pci


    },
  }
}
</script>

<style scoped>

</style>
