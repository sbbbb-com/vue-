//配置路由相关的信息
import VueRouter from "vue-router";
import Vue from "vue";
//导入自定义组件信息
import Home from "../components/Home";
import About from "../components/About";
import User from "../components/User";

//1.通过Vue.use(c插件)， 安装插件
Vue.use(VueRouter)

//提取配置数组
const  routes=[
  //配置路径和组件的映射关系
  // 数组中每一个元素都是一个映射关系
  {
    //路由默认路径
    path: '',
    //重定向 将页面初始化界面重定向为 home界面
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/user/:userId',
    component: User
  }
]

//2.创建 VueRouter对象
const router=new VueRouter({
  //配置路由和组件的应用关系
  routes,
  //将页面井号的哈希模式改为HTML5的history模式
  mode: "history",
  //更改 点击后的活动 附加class属性名称
  linkActiveClass: 'active'
})



export default router
