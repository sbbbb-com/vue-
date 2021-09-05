import Vue from 'vue'
import App from './App'
//导入路由
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //引入路由
  router,
  render: h => h(App)
})

