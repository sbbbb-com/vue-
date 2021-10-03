<template>
  <!--home组件-->
  <el-container class="home-container">
    <!-- 头部区域-->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt=""/>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!-- 侧边栏-->
      <el-aside width="200px">
        <!--侧边栏菜单区域-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!--一级菜单-->
          <el-submenu index="1">
          <!--一级菜单的模版区-->
            <template slot="title">
            <!--i 包裹是图标-->
              <i class="el-icon-location"></i>
              <!-- 文字区域 -->
              <span>导航一</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="1-1">
              <!--二级菜单的模版区-->
              <template slot="title">
                <!--i 包裹是图标-->
                <i class="el-icon-location"></i>
                <!-- 文字区域 -->
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      // 清除会话保存的 token
      window.sessionStorage.clear()
      //使用跳转到登陆页
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d3f;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #323743;
}

.el-main {
  background-color: #eaedf1;
}
</style>