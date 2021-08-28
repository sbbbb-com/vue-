// 使用闭包
;var moduleA=(function () {
  //导出的对象
  var obj={

  }

  // 小明
  var  name= '小明';
  let age=22;

  function sum(num1, num2) {
    console.log('两数和为：'+(num2+num1));
    return num1+num2;
  }

  var flag=true;

  if (flag){
    console.log(sum(1,12));
  }

  //向obj添加flag属性
  //向obj添加sum函数
  obj.flag=flag;
  obj.sub=sum;

  return obj;
})()



//小明
// 小明
var  name= '小明';
let age=22;

function sum(num1, num2) {
  console.log('两数和为：'+(num2+num1));
  return num1+num2;
}

var flag=true;

if (flag){
  console.log(sum(1,12));
}



/*model.exports={
  flag: flag,
  name: name
}*/
