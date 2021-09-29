export  default {

  //每一次获取的时候都是平方
  powerCounter(state){
  return state.counter*state.counter;
},
  //返回所有年龄大于二十的学生信息
  more20stu(state){
  return state.students.filter(stu=>stu.age>20);
},
  //返回在上一步取的学生的个数
  more20stuLength(state,getters){ /*形参还可以有第二个变量，第二个参数表示本getters*/
  return getters.more20stu.length;
},
  // 根据传回来的年龄筛选
  moreAgeStu(state){
  return function (age) { /*返回个函数*/
    return state.students.filter(stu=> stu.age>age);
  }
  /*return age=>{return state.students.filter(stu=>stu.age>=40)};*/
}

}
