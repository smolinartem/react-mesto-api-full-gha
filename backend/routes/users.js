const router = require('express').Router();

const { userIdValidator, updateUserValidator, updateAvatarValidator } = require('../validations/validations');

const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', updateUserValidator, updateUser);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
