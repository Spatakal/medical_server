const express = require('express')
const router = express.Router()
const loginController = require('./login') // your file

router.post('/login', loginController.login)

module.exports = router
