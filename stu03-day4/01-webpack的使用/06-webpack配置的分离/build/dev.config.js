/**
 * 开发时依赖
 */
// 导入 文件合并
const WebpackMerge=require('webpack-merge')
//拿到baseConfig
baseConfig=require('./base.config')

module.exports=WebpackMerge(baseConfig,{
  //配置本地服务器
  devServer: {
    //配置文件夹
    contentBase: './dist',
    //是否需要实时的监听
    inline: true,
    //指定端口
    port: 10101
  }
})