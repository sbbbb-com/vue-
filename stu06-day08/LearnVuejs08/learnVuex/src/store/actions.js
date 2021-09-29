export  default {
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

}
