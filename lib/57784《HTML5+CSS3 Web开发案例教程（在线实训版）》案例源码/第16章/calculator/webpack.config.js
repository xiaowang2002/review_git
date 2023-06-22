// 动态导入文件路径
const path = require('path')

// HTML插件
const htmlWebpackPlugin = require('html-webpack-plugin');

// CSS
const MiniCssExtractPlugin 
  = require("mini-css-extract-plugin");//提取css到单独文件的插件
const OptimizeCssAssetsPlugin 
  = require('optimize-css-assets-webpack-plugin');//压缩css插件

module.exports = {
  mode: 'production', //production或development
  entry: './index.js', //webpack打包时的入口文件
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'js/bundle.js' //打包成功之后的文件名
  },
  module: {
    rules: [
      // 从右往左处理loader
      {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  // 插件
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      minify: { //压缩HTML文件
        removeComments: true, //删除注释
        collapseWhitespace: true, //删除空格
        removeEmptyAttributes: true, //删除空的属性
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css", //都提到dist目录下的css目录中
    }),
    new OptimizeCssAssetsPlugin() //压缩CSS文件
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: 'localhost',
    inline: true,
    port: 80
  }
}