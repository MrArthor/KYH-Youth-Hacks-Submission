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
router.get('/Add', catchAsync(async(req, res, next) => {
    const title = 'NGO Add Page';
    res.render('NGO/NGOADD', { title });
}));
router.post('/Ad', upload.any('Images'), catchAsync(async(req, res, next) => {
    try {
        console.log(req.files);
        const NGO = new NGOModel(req.body.NGO);
        const imgs = req.files.map(f => ({ Url: f.path, FileName: f.filename }));
        NGO.Images = imgs;
        await NGO.save();
        req.flash('success', 'NGO Added Successfully');
        res.redirect(`/NGO/${NGO._id}`);
    } catch (err) {
        console.log(err);
    }
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
    NGO.Childred.push(Child);
    await NGO.save();
    Child.NGO = NGO;
    await Child.save();

    res.render('NGO/SponsorChild', { title, NGO, Child });
}));
// router.post('/Add', upload.single('image'), catchAsync(async(req, res, next) => {
//     const NGO = new NGOModel({
//         name: req.body.name,
//         Location: req.body.Location,
//         NameOfHead: req.body.NameOfHead,
//         PhoneNumber: req.body.PhoneNumber,
//         About: req.body.About,
//         Email: req.body.Email,
//     });
//     if (req.file) {
//         const result = await storage.upload(req.file);
//         NGO.Images = {
//             Url: result.url,
//             FileName: result.originalname
//         }
//     }
//     await NGO.save();
//     res.redirect(`/NGO/${NGO._id}`, { NGO });
// }));

router.post('/Add', upload.array('Images'), catchAsync(async(req, res, next) => {
    const NGO = new NGOModel(req.body.NGO);
    const imgs = req.files.map(f => ({ Url: f.path, FileName: f.filename }));
    NGO.Images = imgs;
    await NGO.save();
    res.redirect('/NGO');
}));
module.exports = router;