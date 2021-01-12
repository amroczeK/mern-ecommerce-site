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

module.exports = router;
