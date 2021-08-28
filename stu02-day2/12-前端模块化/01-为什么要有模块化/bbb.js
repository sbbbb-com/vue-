// 小红
;const moduleB = (function () {

  const obj = {};

  const name = '小红';
  const flag = true;

  if (flag) {
    console.log(name);
  }

  obj.name = name;
  obj.flag = flag;

  return obj;

})(); /*立即执行函数*/