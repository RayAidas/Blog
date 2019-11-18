var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client/src/js/index.js",
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
      },
      {
        test:/\.(png|jpg|gif|svg)$/i,
        loaders:[
          'url-loader?limit=1000&name=img/[name]-[hash:5].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'client/src/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: 4,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
          warnings: false
        },
      },
      cache: true,
    }),
  ],
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