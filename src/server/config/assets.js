import express from 'express';
import path from 'path';
import csp from 'helmet-csp';

const assets = express();

if (process.env.USE_DEV && process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const dev = require('webpack-dev-middleware');
  const hot = require('webpack-hot-middleware');
  const config = require('./webpack.client');
  const compiler = webpack(config);

  assets.use(dev(compiler, {
    publicPath: config.output.publicPath
  }));

  assets.use(hot(compiler));
} else {
  assets.use('/assets', express.static(path.join('assets')));
  assets.use('/', express.static(path.join('assets')));
  assets.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      reportUri: '/report-violation',
      workerSrc: ["'worker-src'"]
    },
    loose: true,
  }))
}

export function configureAssets() {
  return assets;
}
