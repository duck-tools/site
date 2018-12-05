const { resolve } = require('path');
const base = require('./webpack.config');

module.exports = Object.assign({
  target: 'web',
  entry: './src/ClientApp.js',
  devtool: 'source-map',
  output: {
    filename: 'client.bundle.js',
    path: resolve(__dirname, './assets'),
    publicPath: 'assets/'
  }
}, base);
