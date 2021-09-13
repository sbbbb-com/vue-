import Vue from "vue";
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store=new Vuex.Store({
  state: {
    counter: 1000,
    students: [
      {id: 110,name: '测试同学甲',age: 10},
      {id: 111,name: '测试同学乙',age: 21},
      {id: 112,name: '测试同学丙',age: 32},
      {id: 113,name: '测试同学丁',age: 23},
      {id: 115,name: '测试同学戊',age: 43},
    ]
  },
  mutations: {
    //定义方法
    increment(state){  //默认传来了state对象 就是上面的state
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
    incrementCount(state,count){
      state.counter+=count;
    },
    //
    addStudent(state,stu){
      state.students.push(stu);
    }

  },
  actions: {

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

  }
})

//3.导出store对象
export default store
