import express from 'express';
import session from 'express-session';
import redisStoreFactory from 'connect-redis';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

const sessionConfig = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

function enforceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    console.log('request was not https');
    return res.redirect(`https://${req.get('Host')}${req.url}`);
  }
  return next();
}

if (process.env.NODE_ENV === 'production') {
  sessionConfig.use(enforceSsl);
}

const sessionSettings = {
  secret: process.env.COOKIE_SECRET || 'wookie bender',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (process.env.NODE_ENV === 'production') {
  const RedisStore = redisStoreFactory(session);

  sessionSettings.cookie.secure = true;
  sessionSettings.store = new RedisStore({
    url: process.env.REDIS_URL
  });
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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

if (process.env.NODE_ENV === 'production') {
  sessionConfig.enable('trust proxy');
}

sessionConfig.use(session(sessionSettings));
sessionConfig.use(passport.initialize());
sessionConfig.use(passport.session());

export function configureSession() {
  return sessionConfig;
}
