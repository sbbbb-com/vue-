/*1. 使用 commonjs的模块化规范*/
const  {add,mul} =require('./js/mathUtils')

console.log(add(20, 30));;
console.log(mul(20, 30));;

//2.使用ES6的模块化规范
import {name,age,height} from "./js/info";

console.log(name);
console.log(age);
console.log(height);
console.log("base64")

console.log("02")

// 3.依赖 css文件
require('./css/normal.css')

// 4.依赖 less文件
require('./css/special.less')


let app = new Vue({

});
