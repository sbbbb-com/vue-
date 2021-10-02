import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from "@/components/Test";

//懒加载
const login=()=>import('@/components/Login')



Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
      /*将访问首页自动重定向到的登陆界面*/
    {path: '/',redirect: '/login'},
    {path: '/login',component: login},
    {path: '/test',component: Test},
  ]
})

export default router
