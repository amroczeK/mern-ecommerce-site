const router = require('express').Router();
const controller = require('../../controllers/products');
const { protect, isAdmin } = require('../../middleware/authorization');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', controller.getProducts);

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
router
  .route('/:id')
  .get(controller.getProductById)
  .delete(protect, isAdmin, controller.deleteProduct);

module.exports = router;
