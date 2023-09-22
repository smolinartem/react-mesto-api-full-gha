const router = require('express').Router();

const { newCardValidator, cardIdValidator } = require('../validations/validations');
const {
  getAllCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', newCardValidator, createNewCard);
router.get('/', getAllCards);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);
router.delete('/:cardId', cardIdValidator, deleteCard);

module.exports = router;
