const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');

const isProd = process.env.NODE_ENV === 'production'; 

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve(__dirname, './src')]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['assets']),
    isProd && new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: 'cdn',
      navigateFallback: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/`,
      navigateFallbackBlacklist: [
        /^\/callback/,
        /^\/login/,
        /^\/logout/
      ]
    })
  ].filter(Boolean),
  mode: isProd ? 'production' : 'development'
};
