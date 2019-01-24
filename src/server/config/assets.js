import express from 'express';
import path from 'path';
import webpack from 'webpack';
import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';

const assets = express();

if (process.env.USE_DEV && process.env.NODE_ENV !== 'production') {
  const config = require('./webpack.client');
  const compiler = webpack(config);

  console.log(`dev middleware publicPath is ${config.output.publicPath}`);
  assets.use(dev(compiler, {
    publicPath: config.output.publicPath
  }));

  assets.use(hot(compiler));
} else {
  assets.use('/assets', express.static(path.join('assets')));
  assets.use('/', express.static(path.join('assets')));
}

export function configureAssets() {
  return assets;
}
