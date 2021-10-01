import Vue from 'vue'
import App from './App.vue'

import axios from "axios";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

axios({
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
})

//1.基本使用