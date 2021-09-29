export  default {

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
