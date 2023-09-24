const { Error } = require('mongoose');
const Cards = require('../models/card');

const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Cards.find({});
    res.status(200).send({ cards });
  } catch (err) {
    next(err);
  }
};

const createNewCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Cards.create({ name, link, owner });
    res.status(201).send({ card });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Cards.findById(req.params.cardId).orFail();
    if (!card.owner.equals(req.user._id)) {
      throw new ForbiddenError('Нельзя удалять карточки других пользователей');
    }
    await Cards.findOneAndDelete(card);
    res.status(200).send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Карточка не найдена'));
    } else if (err instanceof Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    res.status(200).send({ card });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Карточка не найдена'));
    } else if (err instanceof Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    res.status(200).send({ card });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Карточка не найдена'));
    } else if (err instanceof Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getAllCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
