// 生产环境
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin')
// 导入 文件合并
const WebpackMerge=require('webpack-merge')
//拿到baseConfig
baseConfig=require('./base.config')


module.exports=WebpackMerge(baseConfig,{
  plugins: [
    //代码压缩 丑化
    new UglifyjsWebpackPlugin()
  ]
})

