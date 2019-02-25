import express from 'express';
import compression from 'compression';
import path from 'path';
import https from 'https';
import fs from 'fs';
import { configureAssets } from './config/assets';
import { configureSession } from './config/session';
import { renderApp } from './renderer';
import { authRouter } from './routes/auth';
import { graphqlRouter } from './routes/graphql';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
}

app.use(compression());
app.use(configureSession());

app.use(configureAssets());

app.use('/', authRouter);
app.use('/', graphqlRouter);

app.use((req, res) => {
  const authData = {};
  if (!!req.user) {
    const { displayName, picture } = req.user;
    authData.displayName = displayName;
    authData.picture = picture;
  }
  res.send(renderApp({ authData }));
});

const port = process.env.PORT || 3000;
if (process.env.LOCAL_HTTPS) {
  fs.readFile('server.key', (err, key) => {
    if (err) {
      console.error('Error reading server key', err);
      return;
    }
    fs.readFile('server.cert', (err, cert) => {
      if (err) {
        console.error('Error reading server cert', err);
        return;
      }
      https.createServer({ key, cert }, app)
        .listen(port, () => console.log(`App started on port ${port}`));
    });
  });
} else {
  app.listen(port, () => console.log(`App started on port ${port}`));
}
