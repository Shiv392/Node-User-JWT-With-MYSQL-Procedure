const express=require('express');
const routes=express.Router();
const Login=require('../controllers/Login.js');
const SignUp = require('../controllers/SignUp.js');
const ResetPassword = require('../controllers/ResetPasword.js');

routes.post('/login',Login);
routes.post('/signup',SignUp);
routes.post('/resetpassword',ResetPassword);

module.exports=routes;