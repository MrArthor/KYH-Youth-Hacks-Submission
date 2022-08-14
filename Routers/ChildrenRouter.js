const express = require('express');

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const { IsLoggedIn } = require("../Middleware/index")
const ChildModel = require('../Models/ChildModel');
const router = express.Router({ mergeParams: true });

router.get('/', IsLoggedIn, catchAsync(async(req, res, next) => {
    const Children = await ChildModel.find({});
    const title = 'Children List Page';
    const id = req.user._id;

    res.render('Children/ChildList', { title, Children, id });
}));
router.get('/Add', IsLoggedIn, catchAsync(async(req, res, next) => {
    const title = 'Children Add Page';
    res.render('Children/ChildrenAdd', { title });
}));
router.post('/Add', upload.single('image'), catchAsync(async(req, res, next) => {
    const Child = new ChildModel(req.body.Child);
    if (req.file) {
        const result = await storage.upload(req.file);
        Child.Images = {
            Url: result.url,
            FileName: result.originalname
        }
    }
    await Child.save();
    res.redirect('/Children');
}));
router.get('/:id', IsLoggedIn, catchAsync(async(req, res, next) => {
    const Child = await ChildModel.findById(req.params.id);
    const title = 'Children Details Page';
    const id = req.user._id;
    res.render('Children/ChildrenDetails', { title, Child, id });
}));
module.exports = router;