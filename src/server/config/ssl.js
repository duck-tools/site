export function restrictSSL() {
  return (req, res, next) => {
    if (req.secure) {
      next();
    } else {
      const path = `https://${req.headers.host}${req.url}`;
      res.redirect(path);
    }
  };
}
