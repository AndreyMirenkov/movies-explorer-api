require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLoggder, errorLogger } = require('./middlewares/logger');
const { RateLimiter } = require('./middlewares/rateLimiter');
const { signupValidator, signinValidator } = require('./middlewares/validator');

const app = express();
const { PORT = 3000 } = process.env;
const { DB = 'mongodb://localhost:27017/moviesdb' } = process.env;

app.use(helmet());

app.use(requestLoggder);

app.use(RateLimiter);

const allowedCors = [
  'http://diploma.nomorepartiesxyz.ru',
  'https://diploma.nomorepartiesxyz.ru',
  'http://api.diploma.nomorepartiesxyz.ru',
  'https://api.diploma.nomorepartiesxyz.ru',
  'http://localhost:3000',
];
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DB);

app.post('/signin', signinValidator, login);
app.post('/signup', signupValidator, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.post('/signout', (req, res) => {
  res.status(202).clearCookie('jwt').send('cookie cleared');
});

app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Not found' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Ошибка на сервере' : message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${PORT}`);
});
