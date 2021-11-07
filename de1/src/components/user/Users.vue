<template>
<div>
  <!-- 面包屑导航区 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>

  </el-breadcrumb>

  <!-- 卡片视图区 -->
  <el-card >
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input placeholder="请输入内容"
                  v-model="queryInfo.query"
                  clearable
                  @clear="getUserList">
          <el-button slot="append"
                     @click="getUserList"
                     icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4" >
        <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户列表区 -->
    <el-table :data="userList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态" prop="mg_state">
        <template slot-scope="scope">
          <!-- 开关组件 -->
          <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <!-- 同样使用作用域插槽 -->
        <template slot-scope="">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <!-- 分配角色按钮 -->
          <!-- 添加按钮上的消息提示 -->
          <el-tooltip   effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini">
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="queryInfo.pagenum"
                   :page-sizes="[1,2,5,12,30,50,100]"
                   :page-size="queryInfo.pagesize"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="total">
    </el-pagination>
  </el-card>

  <!-- 添加用户的对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addDialogVisible"
    @close="addDialogClosed"
    width="50%">
    <!-- 内容主题区 -->
    <el-form :model="addForm"
             status-icon
             :rules="addFormRules"
             ref="addFormRef"
             label-width="70px">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>

    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  </el-dialog>

  <!-- 修改用户 对话框 -->
  <el-dialog
    title="修改用户的对话框"
    :visible.sync="editDialogVisible"
    width="50%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: "Users",
  data(){
    // 自定义邮箱规则
    const checkEmail = (rule, value, callback) => {
      //console.log(rule);
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 自定义手机号规则
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }

    return {
      //定义获取用户列表的请求的get参数
      queryInfo: {
        //搜索的关键字
        query: '',
        //当前的页数  默认 1
        pagenum: 1,
        //当前每页显示多少条 默认 2
        pagesize: 2
      },
      userList: [],
      total : 0,
      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      //控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //添加用户的表单数据
      addForm:{
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      //添加表单验证规则
      addFormRules: {
        username: [
          {require: true,message: '请输入用户名',trigger:'blur'},
          {min: 3,max: 10,message: '用户名的长度在3-10之间',trigger: 'blur'}
        ],
        password: [
          {require: true,message: '请输入密码',trigger:'blur'},
          {min: 6,max: 15,message: '密码的长度在6-15之间',trigger: 'blur'}
        ],
        email: [
          {require: true,message: '请输入邮箱',trigger:'blur'},
          {validator: checkEmail,trigger: 'blur' }
        ],
        mobile: [
          {require: true,message: '请输入手机号',trigger:'blur'},
          {validator: checkMobile,trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    //发起请求
    this.getUserList();
  },
  methods: {
    //获取用户列表
    async getUserList(){
      const {data:res}=await this.$http.get('users',{
        params: this.queryInfo
      });
      if (res.meta.status!==200) {
        return this.$message.error("获取用户列表失败")
      }
      //获取到具体值保存到data中数组
      this.userList=res.data.users;
      this.total=res.data.total;
      //console.log(this.userList);
      //console.log(this.total);
    },
    //监听 pageSize分页的事件处理函数
    handleSizeChange(newSize){
      //console.log(newSize)
      //根据用户选择重新赋值
      this.queryInfo.pagesize=newSize;
      this.getUserList();
    },
    //定义 页码值的改变的函数
    handleCurrentChange(newPage){
      //console.log(newPage)
      //当分页设置等改变时 重新回调列表数据
      this.queryInfo.pagenum=newPage;
      this.getUserList();
    },
    //监听
   async userStateChanged(userInfo){
      //console.log(userInfo);
    const {data:res}=await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)

     if (res.meta.status!==200){
       //更新失败 将按钮取反重置回去
       userInfo.mg_state=!userInfo.mg_state
       return this.$message.error('更新用户状态失败');
     }
     this.$message.success('更新用户状态成功！')
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed(){
      this.$refs.addFormRef.resetFields();
    },
    //提交表单前的校验工作 添加用户
    addUser(){
      //拿到整个表单的引用对象
      this.$refs.addFormRef.validate(async  valid=>{
        //如果校验失败 直接终止
        if (!valid)return ;
        //否则可以发起 添加用户的网络请求
        const {data:res}= await this.$http.post('users',this.addForm);

        if (res.meta.status!== 201){
          this.$message.error("添加用户失败")
        }
        this.$message.success("添加用户成功");
        //隐藏添加用户对话框
        this.addDialogVisible=false;
        //刷新用户的操作列表  重新获取用户列表
         this.getUserList();
      })
    },
    //展示编辑用户的对话框 修改对话框按钮
    showEditDialog(){
      this.editDialogVisible=true;
    }
  }
}
</script>

<style lang="less" scoped>

</style>