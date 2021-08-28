const path = require('path'); //导入模块

module.exports={

  //指出入口
  entry: './src/main.js',
  //指出出口
  output: {
    /*__dirname保存当前文件所在路径*/
    path: path.resolve(__dirname,'dist'), //动态获取路径
    filename: 'bundle.js'
  },
}