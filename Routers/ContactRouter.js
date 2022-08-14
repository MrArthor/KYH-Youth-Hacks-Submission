const express = require('express');
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const { IsLoggedIn } = require("../Middleware/index")

const router = express.Router({ mergeParams: true });
const ContactModel = require('../Models/ContactModel');
router.get('/', (req, res) => {
    const title = "Contact";
    res.render('contact', { title });
}).post('/', catchAsync(async(req, res) => {

    const Model = new ContactModel(req.body.Contact);

    await Model.save();
    req.flash('success', 'Thank you for contacting us!');
    res.redirect('/Contact');
}));


module.exports = router;