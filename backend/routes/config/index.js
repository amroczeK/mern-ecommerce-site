const router = require('express').Router()
const controller = require('../../controllers/config')
const protect = require('../../middleware/authorization')

router.get('/paypal', controller.getPaypalClientID)

module.exports = router
