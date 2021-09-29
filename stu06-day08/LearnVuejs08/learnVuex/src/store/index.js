import Vue from "vue";
import Vuex from 'vuex'
import {INCREMENT} from "./mutations-types";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//1.安装插件
Vue.use(Vuex)

//2.创建对象

const moduleA={
  moduleA
}
const  state={
  counter: 1000,
  students: [
    {id: 110,name: '测试同学甲',age: 10},
    {id: 111,name: '测试同学乙',age: 21},
    {id: 112,name: '测试同学丙',age: 32},
    {id: 113,name: '测试同学丁',age: 23},
    {id: 115,name: '测试同学戊',age: 43},
  ],
  info:{
    name: '测试info',
    age: 48,
    height: 200

  }
}
const store=new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    moduleA
  }
})

//3.导出store对象
export default store

/*//对象的解构
const obj ={

  name: 'why',
  age: 19,
  height: 109
  address: '404'
}

const name1=obj.name;
const name1=obj.age;
const name1=obj.height;
console.log(name1);
//==>
const {name,age,height}=obj;
const {height,age,name}=obj;*/
