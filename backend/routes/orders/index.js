const router = require('express').Router()
const controller = require('../../controllers/orders')
const protect = require('../../middleware/authorization')

router.route('/').post(protect, controller.addOrderItems)
router.route('/:id').get(protect, controller.getOrderbyId)

module.exports = router
