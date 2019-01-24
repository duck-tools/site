const { resolve } = require('path');
const base = require('./webpack.config');

module.exports = Object.assign({
  target: 'web',
  entry: [
    process.env.USE_DEV && 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/ClientApp.js'
  ].filter(Boolean),
  devtool: 'source-map',
  devServer: {
    contentBase: './assets'
  },
  output: {
    filename: 'client.bundle.js',
    path: resolve(__dirname, './assets'),
    publicPath: '/assets/'
  }
}, base);
