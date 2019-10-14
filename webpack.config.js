var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client/src/js/index.js",
  // devServer:{
  //   open:true,
  //   port:3000,
  //   contentBase:'client',
  //   hot:true
  // },
  // plugins:[
  //   // 配置插件的节点
  //   // new 一个热更新的模块对象，这是启用热更新的第三步
  //  new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'], //添加组件的插件配置
        }
      },
      //下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
      {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")({
                overrideBrowserslist: ['last 5 versions']
              })]
            }
          }
        ]
      },
      {                            
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    // path: __dirname,
    path: path.join(__dirname, 'client/src/dist'),
　　filename: 'bundle.js'
    // filename: "./client/src/dist/bundle.js"
  },
  mode: 'development',
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
  ],
  performance: {
    hints: false
  }
};