import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
//导入全局样式表
import '@/assets/css/global.css'
//导入字体图标
import '@/assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
