<template>
  <div id="app">

    <h2>-----------App的内容 modules=== -----------</h2>
    <h2>{{$store.state.moduleA.name}}</h2>
    <button @click="updateName"> 修改名字</button>
    <h2>{{$store.getters.fullName}}</h2>
    <h2>{{$store.getters.fullName2}}</h2>
    <h2>{{$store.getters.fullName3}}</h2>

    <button @click="asyncUpdateName">异步修改名字</button>

    <h2>{{message}}</h2>
    <h1>{{$store.state.counter}}</h1>
    <button @click="addition">+</button>
    <button @click="subtraction">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStudent">添加学生</button>


    <h2>-----------App的内容 Getters相关信息-----------</h2>
    <h2>{{$store.getters.powerCounter}}</h2>
    <h2>----------拿到所有学生----------</h2>
<!--    <h2>{{more20stu}}</h2>-->
    <ul>
      <li v-for="item in $store.getters.more20stu">{{item}}</li>
    </ul>
    <h2>学生个数为：{{$store.getters.more20stuLength}}</h2>

    <h2>{{$store.getters.moreAgeStu(33)}}</h2>

    <h2>展示info里面内容： {{$store.state.info}}</h2>
    <button @click="updateInfo">修改info</button>

    <h2>传入一个学生</h2>

    <h2>--------------Hello Vuex的内容--------------</h2>
    <hello-vuex :counter="counter"></hello-vuex>
  </div>
</template>

<script>

import HelloVuex from "./components/HelloVuex";
//普通以大括号导入
import {INCREMENT} from "./store/mutations-types";

export default {
  name: 'App',
  data(){
    return {
      message: '我是App组件',
      counter: 0
    }
  },
  components: {
    HelloVuex
  },
  //计算属性
  computed: {
    more20stu(){
      return this.$store.state.students.filter(s=>{ /*使用过滤*/
        /*返回所有的年龄大于20的学生*/
        return s.age>=20;
      });
    }
  },
  methods:{
    addition(){
      this.$store.commit(INCREMENT);
    },
    subtraction(){
      this.$store.commit('decrement');
    },
    addCount(count){
      //payload 负载
      //1.. 普通的提交封装
      //this.$store.commit('incrementCount',count);

      //2.特殊的提交封装
      this.$store.commit({
        type: 'incrementCount',
        count
      })
    },
    //传入学生对象
    addStudent(){
      const stu={id: 116,name: '测试同学己',age: 38};
      this.$store.commit('addStudent',stu);
    },
    updateInfo(){
      //this.$store.commit("updateInfo");
      /*this.$store.dispatch('aUpdateInfo',/!*可以传递去个函数*!/{
        message: '我是携带的消息',
        success: ()=>{
          console.log("里面已经完成了！！！")
        }
      });*/

      this.$store
        .dispatch('aUpdateInfo',"我是携带的信息" )
        .then(res=>{
          console.log("里面完成了提交！")
          console.log(res)
        })
    },
    updateName(){
      this.$store.commit('updateName',"李四")
    },
    asyncUpdateName(){
      this.$store.dispatch('aUpdateName');
    }
  }
}
</script>

<style>

</style>
