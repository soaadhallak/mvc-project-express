const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const { validate } = require("../middlewares/validate");
const registerSchema = require("../validations/auth/registerUserValidation");
const loginSchema = require("../validations/auth/loginUserVakidation");


router.get('/register', authController.registerPage);
router.post('/register',validate(registerSchema, 'auth/register'), authController.register);


router.get('/login', authController.loginPage);
router.post('/login', validate(loginSchema, 'auth/login'), authController.login);

router.get('/logout', authController.logout);

module.exports = router