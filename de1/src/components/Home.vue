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
      <el-aside :width="isCollapse? '64px': '200px'">
        <div class="toggle-button" @click="toggleCollapse">||||</div>
        <!--侧边栏菜单区域-->
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF">
          <!--一级菜单-->
          <el-submenu :index="item.id+''"
                      v-for="item in menuList"
                      :key="item.id">
          <!--一级菜单的模版区-->
            <template slot="title">
            <!--i 包裹是图标-->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文字区域 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              @click="saveNavState('/'+children.path)"
              :index="'/'+children.path"
              v-for="children in item.children"
              :key="children.id">
              <!--二级菜单的模版区-->
              <template slot="title">
                <!--i 包裹是图标-->
                <i class="iconfont icon-qiapianxingshi"></i>
                <!-- 文字区域 -->
                <span>{{children.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体-->
      <el-main>
        <!-- 路由占位符 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      //定义保存左侧菜单数据
      menuList: [],
      //根据旁边菜单的编号匹配对应的图标
      iconsObj: {
        '125': 'iconfont icon-yonghu',
        '103': 'iconfont icon-shezhi',
        '101': 'iconfont icon-gouwuche',
        '102': 'iconfont icon-dingdan',
        '145': 'iconfont icon-others',
      },
      //定义布尔值 是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath: ''
    }
  },
  //定义内置的生命周期函数  页面加载完执行此
  created() {
    //获取菜单数据 赋值给上面的自定义菜单列表对象
    this.getMenuList();
    //给激活组件状态赋值
    this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      // 清除会话保存的 token
      window.sessionStorage.clear()
      //使用跳转到登陆页
      this.$router.push("/login")
    },
    //发起请求 获取左侧所有菜单数据的 函数
    getMenuList(){
      this.$http("menus").then(res=>{
        if (res.data.meta.status===200){
          //获取数据成功
          this.menuList=res.data.data
          console.log(this.menuList);
        }else {
          //获取数据失败
          console.log("获取数据失败："+res.data.meta.msg)
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    //点击按钮展开左侧菜单 切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse=!this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath=activePath
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

  //微调边框线
  .el-menu{
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont{
  //调节图标与文本间的间距
  margin-right: 10px;
}

.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
