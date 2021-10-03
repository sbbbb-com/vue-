module.exports={
  //自定义配置
  configureWebpack: {
    resolve: {
      // extensions: []
      //配置别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        //'router': '@/router',
        //'store': '@/store',
        'views': '@/views',
      }
    }
  }
}