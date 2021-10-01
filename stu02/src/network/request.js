import axios from "axios";

export  function request(config) {
    //1.创建axios的实例
    const instance=axios.create({
      baseURL: "https://api-hmugo-web.itheima.net/api/public/v1",
      timeout: 5000
    })

  //2.axios的拦截器
  //请求拦截
  instance.interceptors.request.use(config=>{
    console.log(config)
    //作用
    //1.比如说 config中的一些信息 不符合服务器要求
    //2.比如在发送网络请求时候 显示请求加载中的图标
    //3.某些网络请求（token 登录），必须携带一些特殊的信息
    return config
  },error => {
    console.log(error);
  });
    //响应拦截
  instance.interceptors.response.use(res=>{
    console.log(res.data);
    return res.data
  },error => {
    console.log(error);
  });

    //发送真正的网络请求
   return  instance(config)

}

/*export  function request(config) {
  return new Promise((resolve, reject) => {

    //1.创建axios的实例
    const instance=axios.create({
      baseURL: "https://api-hmugo-web.itheima.net/api/public/v1",
      timeout: 5000
    })

    //发送真正的网络请求
    instance(config)
        .then(res=>{
          resolve(res)
        })
        .catch(err=>{
          reject(err)
        })
  })
}*/

/*
export  function request(config,success,failure) {
  //1.创建axios的实例
  const instance=axios.create({
    baseURL: "https://api-hmugo-web.itheima.net/api/public/v1",
    timeout: 5000
  })

  //发送真正的网络请求
  instance(config)
      .then(res=>{
        //console.log(res);
        success(res)
      })
      .catch(err=>{
        //console.log(err);
        failure(err)
      })
}*/

/*export function test(aa,bb) {
  aa('aaa')
  bb()
}

test(function (res) {
  console.log(res);
},function () {

})*/

