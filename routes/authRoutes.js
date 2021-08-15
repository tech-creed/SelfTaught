const authController = require("../controllers/authController");
const express = require("express");
const routes = express();

routes.post("/mail-verified/:tmp_token", authController.MailVerified);

routes.post("/signup", authController.signup);
routes.post("/login", authController.login);
routes.post("/forgot_pass", authController.ResetPass);

module.exports = routes;
