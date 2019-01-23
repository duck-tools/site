import express from 'express';
import compression from 'compression';
import path from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { configureSession } from './config/session';
import { restrictSSL } from './config/ssl';
import { renderApp } from './renderer';
import { authRouter } from './routes/auth';

const app = express();

if (process.env.LOCAL_HTTPS) {
  app.use(restrictSSL());
}
app.use(compression());
app.use(configureSession());
app.use('/assets', express.static(path.join('assets')));
app.use('/', express.static(path.join('assets')));
app.use('/', authRouter);

app.use((req, res) => {
  const isAuthenticated = !!req.user;
  res.send(renderApp({ isAuthenticated }));
});

const port = process.env.PORT || 3000;
if (process.env.LOCAL_HTTPS) {
  fs.readFile('server.key', (err, key) => {
    fs.readFile('server.cert', (err, cert) => {
      https.createServer({ key, cert }, app)
        .listen(port, () => console.log(`App started on port ${port}`));
    });
  });
} else {
  app.listen(port, () => console.log(`App started on port ${port}`));
}
