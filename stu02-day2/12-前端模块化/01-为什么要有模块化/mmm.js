;
(function () {
  //1.想使用flag
  if (moduleA.flag){
    console.log('小明是天才，哈哈哈');
  }

  //2.使用sum函数
  moduleA.sub(45,50);
})()

//从aaa.js文件 中找到


/*
let  obj=require('./aaa.js')
let  flag=obj.flag;
let  sum=obj.sum;
等价与
let {flag,sum} =require('./aaa.js')
*/

