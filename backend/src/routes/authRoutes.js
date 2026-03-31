const express = require('express');
const { signup, signin } = require('../controllers/authController');
const { validateSignupBody, validateSigninBody } = require('../middlewares/validateAuth');

const authRouter = express.Router();

authRouter.post('/signup', validateSignupBody, signup);
authRouter.post('/signin', validateSigninBody, signin);

module.exports = authRouter;
