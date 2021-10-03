import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载 组件
const login = () => import('@/components/Login')
const Test = () => import('@/components/Test')
const Home = () => import('@/components/Home')


Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    /*将访问首页自动重定向到的登陆界面*/
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
    {path: '/test', component: Test},
    {path: '/home', component: Home}
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从那个路径跳转而来
  //next 是一个函数 表示放行
  // next用法 next（） 放行  next('/login') 强制跳转

  //登陆页 公开放行
  if (to.path === '/login') return next()
  //否则其他的 要进行判断  获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) {
    //如果 token不存在 强制跳转到登陆页
    return next('/login')
  }
  //其余的放行
  next()

})

export default router
