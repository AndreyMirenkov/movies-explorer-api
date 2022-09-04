const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require('../errors/authorization-error');

module.exports.auth = (req, res, next) => {
  const userToken = req.cookies.jwt;
  if (!userToken) {
    throw new AuthorizationError('Необходима авторизация');
  } else {
    let payload;
    try {
      payload = jwt.verify(userToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      throw new AuthorizationError('Необходима авторизация');
    }
    req.user = payload;
    next();
  }
};
