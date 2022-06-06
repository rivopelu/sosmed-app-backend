const { RegisterController } = require('../controller/authController')

const router = require('express').Router()


// REGISTER
router.post('/register', RegisterController)


module.exports = router