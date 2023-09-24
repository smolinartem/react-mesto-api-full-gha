const { Error } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const config = require('../config');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');

const signOut = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Осуществлён выход' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      config.NODE_ENV === 'production' ? config.JWT_SECRET : 'secret-key',
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).status(200).send({ message: 'Пользователь авторизировался' });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email, password: passwordHash, name, about, avatar,
    });
    res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (err.code === 11000) {
      next(new ConflictError('Данный email используется'));
    } else {
      next(err);
    }
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id).orFail();
    res.status(200).send({ user });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь не найден'));
    } else {
      next(err);
    }
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.userId).orFail();
    res.status(200).send({ user });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь не найден'));
    } else if (err instanceof Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail();
    res.status(200).send({ user });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь не найден'));
    } else if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail();
    res.status(200).send({ user });
  } catch (err) {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь не найден'));
    } else if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports = {
  signOut,
  login,
  createUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
};
