const express = require('express');
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const { IsLoggedIn } = require("../Middleware/index")
const UserModel = require('../Models/UserModel');
const PatronModel = require('../Models/PatronModel');
const router = express.Router({ mergeParams: true });


router.get('/', IsLoggedIn, catchAsync(async(req, res, next) => {
    const Patrons = await PatronModel.find({});
    const title = 'Patrons List Page';
    res.render('./Patron/PatronList', { title, Patrons });
}));
router.get('/add', IsLoggedIn, catchAsync(async(req, res, next) => {
    const title = 'Patron Add Page';
    res.render('./Patron/PatronAdd', { title });
}));
router.post('/add', upload.array('Images'), catchAsync(async(req, res, next) => {
    console.log(req.files);
    const Patrons = new PatronModel(req.body.Patron);

    const User = await UserModel.findById(req.user._id);
    User.Patrons = Patrons;
    await User.save();
    Patrons.User = User;
    Patrons.Images = {
        Url: 'https://res.cloudinary.com/mrarthor/image/upload/v1660475383/Social-Equity/istockphoto-1209654046-612x612_m0xtlq.jpg',
        FileName: 'Social-Equity/person_xgaybt.jpg'
    };
    await Patrons.save();
    req.flash('success', 'Patron Added Successfully');
    res.redirect(`/Patron/${Patrons._id}`);
}));
router.get('/:id', IsLoggedIn, catchAsync(async(req, res, next) => {
    const Patron = await PatronModel.findById(req.params.id);
    const title = 'Patron Detail Page';
    res.render('./Patron/PatronDetails', { title, Patron });
}));
router.get('/:PatronId/AddChild', IsLoggedIn, catchAsync(async(req, res, next) => {
    const Patron = await PatronModel.findById(req.params.PatronId).populate('Images');
    const title = 'Patron Add Child Page';
    res.render('./Patron/AddChild', { Patron, title });
}));

module.exports = router;