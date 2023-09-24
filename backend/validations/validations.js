const { celebrate } = require('celebrate');
const Joi = require('joi');

const config = require('../config');

const authValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().optional().min(2).max(30),
    about: Joi.string().optional().min(2).max(30),
    avatar: Joi.string().optional().pattern(config.URL_REGEX),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(config.URL_REGEX),
  }),
});

const newCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(config.URL_REGEX),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  userIdValidator,
  updateUserValidator,
  updateAvatarValidator,
  authValidator,
  newCardValidator,
  cardIdValidator,
};
