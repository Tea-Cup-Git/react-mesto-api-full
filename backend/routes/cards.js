/* eslint-disable object-curly-newline */
const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createCard, getCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(2)
      .max(30),
    link: Joi.string().trim().uri().required(),
    alt: Joi.string()
  })
}), createCard);

cardsRouter.delete('/cards/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
  })
}), deleteCard);

cardsRouter.put('/cards/likes/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
  })
}), likeCard);

cardsRouter.delete('/cards/likes/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
  })
}), dislikeCard);

module.exports = cardsRouter;