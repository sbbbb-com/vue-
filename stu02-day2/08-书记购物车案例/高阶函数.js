//编程范式：命令式编程／声明式编程
//　(编程范式:面向对象编程(第一公民:对象)/函数式编程(第一公民:函数)
// 高阶函数 filter / map / reduce

// filter中的回调函数有一个要求：必须返回一个Boolean值
// 返回值： true： 函数内部会自动将本次回调的n加入到新的数组中
//        false：函数内部会过滤掉这次的N

//1.需求 取出所有小于一百的数字
/*const nums=[100,120,303,805,90,208,505,609,200,10]
let newNums=[]
for (let num of nums) {
  if (num<100){
    newNums.push(num);
  }
}*/

//1.1 高阶函数 filter
const nums=[100,120,303,805,90,208,55,609,200,10]

/*let total=nums.filter(function (n) {
  return n<100;
}).map(function (n) {
  return n*2;
}).reduce(function (prevValue, n) {
  return prevValue+n;
},0);*/

let total3 = nums.filter(n=>n<100).map(n=>n*2).reduce((v, m)=>v+m/*第二个参数的零不写 默认为零*/);
/*同时 注意 箭头函数里面没有自己的this 他绑定是箭头函数外的那个this*/
console.log(total3);

/*let newNums = nums.filter(function (n) { /!*每一次遍历一个数字执行的回调函数*!/
return n<100;
});

console.log(newNums)*/

// 2.将所有小于100的数字进行转化 全部*2
/*let new2Nums=[];
for (let num of nums) {
  new2Nums.push(num*2);
}
console.log(new2Nums)*/

// 2.1 高阶函数 map函数的使用
/*let new2Nums = newNums.map(function (n/!*每次返回的值 会作为新的值*!/) {
  return n*2;
});
console.log(new2Nums);*/

//3.将所有new2Nums中数字相加 得到最终的结果
/*let total=0
for (let n of new2Nums) {
  total+=n;
}
console.log(n)*/

//3.1 高阶函数
// reduce作用对数组中所有的内容进行汇总
/*let total2 = new2Nums.reduce(function (preValue, n) {
  return preValue+n;
},0);

console.log(total2);*/