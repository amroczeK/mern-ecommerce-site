const router = require('express').Router()
const controller = require('../../controllers/users')
const protect = require('../../middleware/authorization')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.post('/', controller.registerUser)

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.post('/login', controller.authUser)

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/profile', protect, controller.getUserProfile)

module.exports = router
