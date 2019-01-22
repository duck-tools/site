export function restrictSSL() {
  return (req, res, next) => {
    if (req.secure || process.env.NODE_ENV !== 'production') {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  };
}
