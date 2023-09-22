const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) throw new UnauthorizedError('Необходима авторизация');
    req.user = decoded;
  });

  return next();
};
