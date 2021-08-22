const app=new Vue({
  //挂载数据
    el: "#app",
    data: {
      books:[ {
        id: 1,
        name: "《算法导论》",
        beginDate: "2006-9",
        price: 85.00,
        count: 1}
      ,
        {
          id: 2,
          name: "《UNIX编程艺术》",
          beginDate: "2006-2",
          price: 59.00,
          count: 1
        },
        {
          id: 3,
          name: "《编程大全》",
          beginDate: "2008-10",
          price: 39.00,
          count: 1
        },
        {
          id: 4,
          name: "《代码大全》",
          beginDate: "2006-3",
          price: 128.00,
          count: 1
        }
      ]
    }

})