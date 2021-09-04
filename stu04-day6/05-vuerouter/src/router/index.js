//配置路由相关的信息
import VueRouter from "vue-router";
import Vue from "vue";
//导入自定义组件信息
/*
import Home from "../components/Home";
import About from "../components/About";
import User from "../components/User";
*/

//路由懒加载
const Home=()=>import('../components/Home')
const About=()=>import('../components/About')
const User=()=>import('../components/User')
const Profile = () => import('../components/Profile')
//子路由的懒加载
const HomeMessage=()=>import('../components/HomeMessage')
const HomeNews=()=>import('../components/HomeNews')

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
    component: Home,
    //配置 news message两个子路由
    children: [
      //添加默认的 访问子路径
      {
        path: '',
        redirect: 'news'
      },
      {
        //在子路由中 不需要加 ”/“ 会自动拼接
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/user/:userId',
    component: User
  },
  {
    path: '/profile',
    component: Profile
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
