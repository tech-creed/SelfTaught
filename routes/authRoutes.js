const authController = require('../controllers/authController')
const express = require('express')
const routes = express()
routes.post('/signup',authController.signup)
routes.post('/login',authController.login)
module.exports = routes;
