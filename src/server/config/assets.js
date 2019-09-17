import express from 'express';
import path from 'path';
import csp from 'helmet-csp';
import frameguard from 'frameguard';
import noSniff from 'dont-sniff-mimetype';

const assets = express();

function cacheControl(req, res, next) {
  next();
  res.set('Cache-Control', 'public, max-age=31557600, immutable');
}

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
  const staticAssetsMiddleware = express.static(path.join('assets'));
  assets.use('/assets', cacheControl, staticAssetsMiddleware);
  assets.use('/', cacheControl, staticAssetsMiddleware);
  assets.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'unsafe-inline'"],
      reportUri: '/report-violation',
      workerSrc: ["'self'"]
    },
    loose: true,
  }));

  assets.use(frameguard({ action: 'deny' }));
  assets.use(noSniff());

  assets.post('/report-violations', (req, res) => {
    if (req.body) {
      console.log('CSP Violation: ', req.body);
    } else {
      console.log('CSP Violation: No data received');
    }
    res.status(204).end();
  });
}

export function configureAssets() {
  return assets;
}
