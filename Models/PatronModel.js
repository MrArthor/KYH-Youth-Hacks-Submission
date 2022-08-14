const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require('./UserModel');
// const PassportLocalMongoose = require('passport-local-mongoose');
const ImageSchema = new Schema({
    Url: String,
    FileName: String
});
ImageSchema.virtual('thumbnail').get(function() {
    return this.Url.replace('/upload', '/upload/w_200');
});
const PatronSchema = new Schema({
    name: String,
    Images: ImageSchema,
    Job: String,
    Place: String,
    PhoneNumber: Number,
    User: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    Images: ImageSchema,

});
// PatronSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("PatronModels", PatronSchema);