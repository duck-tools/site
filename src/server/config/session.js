import session from 'express-session';
import redisStoreFactory from 'connect-redis';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
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

function strategyCallback(accessToken, refreshToken, extraParams, profile, done) {
  console.log(`I'm back from auth0`);
  return done(null, profile);
}

const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, strategyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export function configureSession() {
  return [
    session(sessionSettings),
    passport.initialize(),
    passport.session()
  ];
}
