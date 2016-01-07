/**************************************
 * Created by Hertz on 2015年8月24日
 **************************************/
'use strict'

var path    = require('path')
var webpack = require('webpack')

// webpack 配置
module.exports = {
  devtool: 'eval-source-map',

  context: path.resolve(__dirname, '..'),
  node: {
    __dirname: true
  },

  entry: {
    vendor: ['react', 'react-router', 'redux', 'react-redux'],
    css: './web/public/css/main.scss',
    components: [
      'webpack-hot-middleware/client', 
      './web/src/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../web/bundle'),
    filename: '[name].js',
    publicPath: '/bundle/',
    sourceMapFilename: 'map/[file].map'
  },

  module: {
    loaders: [
      { 
        test: /\.scss/, 
        exclude: /node_modules/,
        loader: 'style!css!sass!autoprefixer-loader?browsers=last 2 version' 
      },

      { 
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },

      { 
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: 'eslint'
      },

      { test: /\.(png|jpg|jpeg|gif|svg)/, loader: 'url?limit=100000' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: {
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      __DEVELOPMENT__: false
    })
  ]

}
