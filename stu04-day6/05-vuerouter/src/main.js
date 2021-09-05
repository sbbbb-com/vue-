import Vue from 'vue'
import App from './App'
// 如果导入的是目录 他会自动寻找其中的index文件
import router from "./router";

Vue.config.productionTip = false

/* eslint禁用无新 */

//自定义
Vue.prototype.test=function () {
  //console.log("test")
}
Vue.prototype.anName="yyesw"

new Vue({
  el: '#app',
  //router: router,
  router,
  render: h => h(App)
})

/*console.log("在main.js中打印");
console.log(router)*/

/*
const obj1={
  name: 'heihei'
}

//给 obj1 添加一个属性
Object.defineProperties(obj1,'age',18)*/

