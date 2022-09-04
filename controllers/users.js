const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-error');
const UniqueEmailError = require('../errors/unigue-email-error');

module.exports.infoUser = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    res.status(200).send({ data: user });
  })
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      message: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch(() => {
      next(new UniqueEmailError('Этот Email уже используется'));
    });
};
module.exports.patchProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch(() => {
      next(new UniqueEmailError('Этот Email уже используется'));
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        // sameSite: true,
      });
      res.send({ message: 'Welcome' });
    })
    .catch(next);
};
