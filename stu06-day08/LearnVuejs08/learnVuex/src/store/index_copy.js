import Vue from "vue";
import Vuex from 'vuex'
import {INCREMENT} from "./mutations-types";

//1.安装插件
Vue.use(Vuex)

//2.创建对象

const moduleA={

    state: {
      name: '张三'
    },
    mutations: {
      updateName(state,payload){
        state.name=payload
      }
    },
    actions: {
      aUpdateName(context, payload) {
        console.log(context);
        setTimeout(()=>{
          context.commit('updateName','wangwu')
        },1000)
      }
    },
    getters: {
      fullName(state){
        return state.name+'111';
      }
      ,
      fullName2(state,getters){
        return getters.fullName+'222'
      },
      fullName3(state,getters,rootState){
        return  getters.fullName2+rootState.counter;
      }
    }
}

const store=new Vuex.Store({
  state: {
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
  },
  mutations: {
    //定义方法
    [INCREMENT](state){  //默认传来了state对象 就是上面的state
      state.counter++;
    },
    decrement(state){
      state.counter--;
    },
    /**
     * 要求对应的 this.$store.commit('incrementCount',count);
     * @param state
     * @param count 传入的参数
     */
    incrementCount(state,payload/*从载荷对象中取数据*/){
      state.counter+=payload.count;
    },
    //
    addStudent(state,stu){
      state.students.push(stu);
    },
    updateInfo(state){
      state.info.name="RedHot........."
      //
      //state.info.name="TEST"
      //state.info['address']="中国"

      //模拟异步操作  不能在这里进行异步操作
    /*  setTimeout(()=>{
        state.info.name="RedHot........."
      },1000)*/

      //set(要修改的对象，索引值，修改后的值)
      //Vue.set(state.info,'address','天府');

      //改方式做不到响应式
      //delete state.info.age;

      //下面即可
      //Vue.delete(state.info,'age')

    }

  },
  actions: {
    /**
     *
     * @param context  上下文
     */
    // aUpdateInfo(context,payload){
    //   setTimeout(()=>{
    //     context.commit('updateInfo')
    //     //回调传进来的函数
    //     console.log(payload.message);
    //     payload.success();
    //     /*payload();*/
    //     //console.log(payload);
    //   },1000)
    // },
    aUpdateInfo(context,payload){
      /**
       * 因为整体返回个Promise 所以 前面调用此方法的东西可以直接在后面 .then
       */
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          context.commit('updateInfo')
          //回调传进来的函数
          console.log(payload);

          resolve();
        },1000)
      })
    }

  },
  getters:{
    //每一次获取的时候都是平方
    powerCounter(state){
      return state.counter*state.counter;
    },
    //返回所有年龄大于二十的学生信息
    more20stu(state){
      return state.students.filter(stu=>stu.age>20);
    },
    //返回在上一步取的学生的个数
    more20stuLength(state,getters){ /*形参还可以有第二个变量，第二个参数表示本getters*/
      return getters.more20stu.length;
    },
    // 根据传回来的年龄筛选
    moreAgeStu(state){
      return function (age) { /*返回个函数*/
        return state.students.filter(stu=> stu.age>age);
      }
      /*return age=>{return state.students.filter(stu=>stu.age>=40)};*/
    }
  },
  modules: {
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
