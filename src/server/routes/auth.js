import express from 'express';
import passport from 'passport';

export const authRouter = express.Router();

authRouter.get('/login', passport.authenticate('auth0', { responseType: 'code', scope: 'openid profile' }), (req, res) => {
  res.redirect('/');
});

authRouter.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    if (err) {
      console.error('an error has occurred attempting to authenticate with auth0');
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, err => {
      if (err) { return next(err); }
      const { returnTo } = req.session;
      delete req.session.returnTo;
      res.redirect(returnTo || '/');
    });
  })(req, res, next);
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
