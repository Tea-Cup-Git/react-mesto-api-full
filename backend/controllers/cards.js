const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Переданы некорректные данные в метод создания карточки');
      }
      res.send(card);
    })
    .catch((err) => {
      throw new BadRequestError(`Переданы некорректные данные. ${err}`);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      Card.findByIdAndRemove(req.params._id)
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};