const router = require('express').Router()
const controller = require('../../controllers/users')
const protect = require('../../middleware/authorization')

router.post('/', controller.registerUser)

router
	.route('/profile')
	.get(protect, controller.getUserProfile)
	.put(protect, controller.updatetUserProfile)

module.exports = router
