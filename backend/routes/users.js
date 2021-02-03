/* eslint-disable object-curly-newline */
const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUsers, getUser, getUserById, updateProfile, updateAvatar, signOut } = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
  })
}), getUser);

usersRouter.get('/users/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
  })
}), getUserById);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
}), updateProfile);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\#?$/)
  })
}), updateAvatar);

usersRouter.get('/signout', signOut);

module.exports = usersRouter;