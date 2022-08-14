const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
//const User = require('../models/User');
const IsLoggedIn = require('../Middleware/index');
const UserController = require("../Controllers/UserController")

router.route("/register")
    .get(UserController.RegisterRender)
    .post(catchAsync(UserController.NewUser));

router.route("/login")
    .get(UserController.LoginRender)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: 'user/Login' }), UserController.LoginCredentials);

router.get('/logout', UserController.Logout);

module.exports = router;