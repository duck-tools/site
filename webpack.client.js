const { resolve } = require('path');
const base = require('./webpack.config');

module.exports = Object.assign({
  target: 'node',
  entry: './src/ServerApp.js',
  output: {
    filename: 'server.bundle.js',
    path: resolve(__dirname, './server'),
    libraryTarget: 'commonjs2'
  }
}, base);
