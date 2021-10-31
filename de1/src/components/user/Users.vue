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
        <el-input placeholder="请输入内容" >
          <el-button slot="append" icon="el-icon-search"></el-button>
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
          <el-switch v-model="scope.row.mg_state">

          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" ></el-table-column>
    </el-table>
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
        query: '',
        pagenum: 1,
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>