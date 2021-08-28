//导入 {} 中定义的变量
import {flag, sum} from "./aaa.js";

if (flag){
  console.log('小明是天才');
  console.log(sum(40, 20));
}

//导入 2 export定义的变量
import {height,num1} from "./aaa.js";

console.log('height=='+height);
console.log('num1=='+num1);

//导入 3 导入对象中定义的函数
import {mul,Person} from "./aaa.js" ;

console.log('mul::'+mul(15, 58));

let person = new Person();
person.run();

//导入 4 export导出的default对象
import adr from "./aaa.js";

adr('你好啊');

//导入 5 统一全部导出
/*
import {flag,Person,height.....} from "./aaa.js"*/

import * as bbb from "./aaa.js"

console.log("as!!=="+bbb.flag);

console.log(bbb.height);
