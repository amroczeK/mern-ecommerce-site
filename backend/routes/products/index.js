const router = require('express').Router()
const controller = require('../../controllers/products')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', controller.getProducts)

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', controller.getProductById)

module.exports = router
