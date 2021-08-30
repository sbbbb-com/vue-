import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

console.log(App);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //渲染
  //render: h => h(App)
  //相当于
  render: function (h) {
    return h(App);
  }
})

//请选择一个预设：
//   default (babel, eslint)
// > 手动选择要素

// 那么 .vue文件中的template是由谁处理的呢？
