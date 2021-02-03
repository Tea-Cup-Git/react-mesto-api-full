/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const auth = require('./middlewares/auth.js');
const { login, createUser } = require('./controllers/users.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/', cors());
app.use(cookieParser());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
    avatar: Joi.string().trim().regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().trim().required().min(8)
  })
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
}), login);

app.use(auth);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);

app.all('/*', (req, res, next) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});