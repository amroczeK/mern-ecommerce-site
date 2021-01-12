const router = require('express').Router();
const controller = require('../../controllers/users');
const { protect, isAdmin } = require('../../middleware/authorization');

router
  .route('/')
  .post(controller.registerUser)
  .get(protect, isAdmin, controller.getUsers);

router
  .route('/profile')
  .get(protect, controller.getUserProfile)
  .put(protect, controller.updatetUserProfile);

router
  .route('/:id')
  .delete(protect, isAdmin, controller.deleteUser)
  .get(protect, isAdmin, controller.getUserById)
  .put(protect, isAdmin, controller.updateUser);

module.exports = router;
