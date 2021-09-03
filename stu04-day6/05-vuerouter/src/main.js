import Vue from 'vue'
import App from './App'
// 如果导入的是目录 他会自动寻找其中的index文件
import router from "./router";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //router: router,
  router,
  render: h => h(App)
})
