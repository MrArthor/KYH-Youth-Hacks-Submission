const express = require('express');

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const { IsLoggedIn } = require("../Middleware/index")
const NGOModel = require('../Models/NGOModel');
const router = express.Router({ mergeParams: true });

router.get('/', IsLoggedIn, catchAsync(async(req, res, next) => {
    const NGOs = await NGOModel.find({});

    const title = 'NGOs List Page';
    res.render('NGO/NGOLIST', { title, NGOs });
}));
router.get('/Add', IsLoggedIn, catchAsync(async(req, res, next) => {
    const title = 'NGO Add Page';
    res.render('NGO/NGOADD', { title });
}));
router.post('/Ad', upload.any('Images'), catchAsync(async(req, res, next) => {

    console.log(req.files);
    const NGO = new NGOModel(req.body.NGO);
    const Photo = {
        Url: 'https://res.cloudinary.com/mrarthor/image/upload/c_scale,w_200/v1660456621/Social-Equity/NGO_dzftst.jpg',
        FileName: 'Social-Equity/NGO_dzftst.jpg'
    };
    NGO.Images = Photo;
    const User = await UserModel.findById(req.user._id);
    User.NGO = NGO;
    await User.save();
    NGO.User = User;
    await NGO.save();
    req.flash('success', 'NGO Added Successfully');
    res.redirect(`/NGO/${NGO._id}`);

}));
router.get('/:Id', IsLoggedIn, catchAsync(async(req, res, next) => {
    const NGO = await NGOModel.findById(req.params.Id).populate('Images').populate('Children');
    const title = 'NGO Details Page';

    res.render('NGO/NGOProfile', { title, NGO });
}));
router.get('/:id/SponsorChild/:ChildId', IsLoggedIn, catchAsync(async(req, res, next) => {
    const NGO = await NGOModel.findById(req.params.id);
    const Child = await NGO.Children.findById(req.params.ChildId);
    const title = 'NGO Sponsor Child Page';
    NGO.Children.push(Child);
    await NGO.save();
    Child.NGO = NGO;
    Child.isAdopted = true;
    await Child.save();

    res.render('NGO/SponsorChild', { title, NGO, Child });
}));
module.exports = router;