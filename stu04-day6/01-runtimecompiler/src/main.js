// 使用 `import` 命令加载的 Vue 构建版本
// (runtime-only or standalone) 已经在 webpack.base.conf 中设置了别名。
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

function abc (num1, num2) {
  return num1 + num2
}

console.log(abc(10, 20))

function kk(){

  console.log('555');
}

kk()
