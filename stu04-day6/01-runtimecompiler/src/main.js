import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const cpn={
  template: '<div>嘿嘿：{{message}}</div>',
  data(){
    return {
      message: '我是组件message！'
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
 /* components: { App },
  template: '<App/>'*/
  render: function (createElement) {
    // 普通用法 1.createElement(‘标签’，｛标签的属性｝,[‘内容’])
    /*return createElement('h2',
      {class: 'box'},
      ['hello word',createElement('button',['按钮'])] );*/

    //2.传入组件的对象
    return createElement(App);
  }
})


