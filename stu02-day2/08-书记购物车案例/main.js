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
          price: 59.009,
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
    },
    methods:  {
      /*getFinalPrice(price){
        //保留两位小数 并且拼接上去中文字符的函数
        return "￥"+price.toFixed(2);
      }*/

      //控制商品的增加 或者减少
      increment(index){
        this.books[index].count++;
      },
      decrement(index){
        if (this.books[index].count>=1){
          this.books[index].count--;
        }
      },
      //移除按钮
      removeHandle(index){
        /*splice 舌普赖斯*/
        this.books.splice(index,1)
      }
  },
  //过滤器
  filters: {
    showPrice(price) {
      return "￥"+parseInt(price).toFixed(2);
    }
  },
  //计算属性
  computed:{
      totalPrice(){
        let  t=0;
        for (let i = 0; i < this.books.length; i++) {
          t+=this.books[i].price*this.books[i].count;
        }
        return t;
      }
  }
})