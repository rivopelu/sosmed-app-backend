const { RegisterController, LoginController } = require('../controller/authController')

const router = require('express').Router()


// REGISTER
router.post('/register', RegisterController)
router.post('/login', LoginController)

module.exports = router