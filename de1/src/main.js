import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
//导入全局样式表
import '@/assets/css/global.css'
//导入字体图标
import '@/assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont'

//导入 axios
import axios from "axios";
//设置请求的根路径
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"
//将对象挂载到vue的全局对象上
Vue.prototype.$http=axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
