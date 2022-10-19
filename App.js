require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLoggder, errorLogger } = require('./middlewares/logger');
const { RateLimiter } = require('./middlewares/rateLimiter');
const { allowedCors } = require('./middlewares/cors');
const router = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
const { DB = 'mongodb://localhost:27017/moviesdb' } = process.env;

app.use(helmet());

app.use(requestLoggder);

app.use(RateLimiter);

app.use(cors(allowedCors));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DB);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'Ошибка на сервере' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${PORT}`);
});
