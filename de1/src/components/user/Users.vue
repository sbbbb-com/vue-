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
        <el-button type="primary">添加用户</el-button>
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
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
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

</div>
</template>

<script>
export default {
  name: "Users",
  data(){
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
      total : 0
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
      console.log(this.userList);
      console.log(this.total);
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
      console.log(newPage)
      //当分页设置等改变时 重新回调列表数据
      this.queryInfo.pagenum=newPage;
      this.getUserList();
    },
    //监听
   async userStateChanged(userInfo){
      console.log(userInfo);
    const {data:res}=await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)

     if (res.meta.status!==200){
       //更新失败 将按钮取反重置回去
       userInfo.mg_state=!userInfo.mg_state
       return this.$message.error('更新用户状态失败');
     }
     this.$message.success('更新用户状态成功！')
    }
  }
}
</script>

<style lang="less" scoped>

</style>