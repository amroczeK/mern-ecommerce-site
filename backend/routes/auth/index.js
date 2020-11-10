const router = require('express').Router()
const controller = require('../../controllers/auth')

router.post('/login', controller.login)
router.get('/logout', controller.logout)

module.exports = router
