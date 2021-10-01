import Vue from 'vue'
import App from './App.vue'
import {request} from "@/network/request";

//import axios from "axios";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

/*axios({
  //传入配置
  url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
  method: 'GET'
}).then(res=>{
  console.log(res)
})

axios({
 url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
}).then(res=>{
  console.log(res)
})*/

//2.axios发送并发请求

/* 使用全局的axios和对应的配置进行网络请求
axios.defaults.baseURL="https://api-hmugo-web.itheima.net/api/public/v1"
axios.defaults.timeout=5000


axios.all([axios({
  url: '/home/swiperdata'
}),
axios({
  url: '/goods/search',
  params: {
    query: '电视',
    pagenum: 3,
    pagesize: 10
  }
})]).then(axios.spread((res1,res2)=>{
  console.log(res1);
  console.log(res2);
}))

axios({
  url: "/categories"
})*/

//4.创建对应的axios实例
/*const instance1 = axios.create({
  baseURL: "https://api-hmugo-web.itheima.net/api/public/v1",
  timeout: 50000
})

instance1("/home/swiperdata")
    .then(res=>{
      console.log(res);
    })

instance1({
  url: "/goods/search",
  params: {
    query: '电视',
    pagenum: 3,
    pagesize: 10
  }
}).then(res=>{
  console.log(res);
})*/

//5.封装request模块
//import {request} from "@/network/request";

/*request({
  url:"/home/swiperdata"
},res=>{
  console.log(res);
},err=>{
  console.log(err);
})*/

/*request({
  baseConfig: {

  },
  success: function (res) {
    console.log(res)
  },
  failure: function (err) {
    console.log(err);
  }
})*/

request({
  url: "/home/swiperdata"
}).then(res=>{
  console.log(res+'');
}).catch(err=>{
  console.log(err+'');
})