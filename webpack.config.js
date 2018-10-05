const { resolve } = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve(__dirname, './src')]
    }]
  }
};
