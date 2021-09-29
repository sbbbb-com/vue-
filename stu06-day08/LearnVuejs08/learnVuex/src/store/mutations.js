import {INCREMENT} from "./mutations-types";

export  default {
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

}
