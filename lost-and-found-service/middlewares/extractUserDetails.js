module.exports.extractUserDetails = (req, res, next) => {
  if (req.query.userId) {
    req.user = { userId: req.query.userId };
    return next();
  }

  if (req.body.user) {
    req.user = { ...req.body.user };
    return next();
  }
  req.user = {};

  next();
};
