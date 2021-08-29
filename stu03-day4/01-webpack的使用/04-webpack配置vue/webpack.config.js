const path = require('path'); //导入模块

module.exports={

  //指出入口
  entry: './src/main.js',
  //指出出口
  output: {
    /*__dirname保存当前文件所在路径*/
    path: path.resolve(__dirname,'dist'), //动态获取路径
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  //配置  css loader
  module: {
    rules: [
        /*当匹配到css文件时 应用下面两个loader*/
      {
        /* \.转义 $结尾 */
        test: /\.css$/,
        /**
         * css-loader: 只负责加载 css文件，不负责解析
         *style-loader：  负责解析
         * 读取多个loader时候 是从右向左读【先应用css-loader，再应用style-loader】
         */
        use: [ 'style-loader', 'css-loader' ]
      },
        //less 处理 loader
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" //从JS字符串创建样式节点
        }, {
          loader: "css-loader" // 将CSS转换为CommonJS
        }, {
          loader: "less-loader" // 编译less 到css
        }]
      },
        //处理图片
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            //
            loader: 'url-loader',
            options: {
              //当加载的图片，小于limit时，会将图片编译成base64字符串的形式
              limit: 160000,
              //当加载的图片 大于limit时，需要使用file-loader模块进行加载
              //npm install --save-dev file-loader@3.0.1
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
        // 将es6 转化为 es5 提升兼容性
      {
        test: /\.js$/,
        //  exclude 排除
        //  include包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
        // 处理 vue
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    //别名
    extensions: ['.js','.vue','.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}