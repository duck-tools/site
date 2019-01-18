import express from 'express';
import session from 'express-session';
import compression from 'compression';
import path from 'path';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import React from 'react';
import ReactDOM from 'react-dom/server';
import ServerApp from './ServerApp';
import { ServerStyleSheet } from 'styled-components';

if (process.env.NODE_ENV !== 'production') {
  require('dovenv').config();
}

const app = express();

function renderApp() {
  let tags = '';
  let html = '';
  if (process.env.SSR_ENABLED) {
    const sheet = new ServerStyleSheet();
    const App = React.createFactory(ServerApp);
    html = ReactDOM.renderToString(sheet.collectStyles(App()));
    tags = sheet.getStyleTags();
  }
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" contnet="width=device-width">
        <title>Duck Tools</title>
        ${tags}
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script src="/assets/client.bundle.js"></script>
    </html>
  `;
}

const sessionSettings = {
  secret: process.env.COOKIE_SECRET || 'wookie bender',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (process.env.NODE_ENV === 'production') {
  sessionSettings.cookie.secure = true;
}

const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
  return done(null, profile);
});

passport.use(strategy);

app.use(compression());
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());
app.use('/assets', express.static(path.join('assets')));

app.use((req, res) => res.send(renderApp()));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App started on port ${port}`));
