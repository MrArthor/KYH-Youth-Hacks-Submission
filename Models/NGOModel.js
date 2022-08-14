const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChildModel = require("./ChildModel");
// const PassportLocalMongoose = require('passport-local-mongoose');
const UserModel = require("./UserModel");
const ImageSchema = new Schema({
    Url: String,
    FileName: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.Url.replace('/upload', '/upload/w_200');
});

const NGOSchema = new Schema({
    name: String,
    Images: ImageSchema,
    Location: String,
    NameOfHead: String,
    PhoneNumber: String,
    About: String,
    Email: String,
    User: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    Children: [{
        type: Schema.Types.ObjectId,
        ref: 'ChildModel'
    }],
    Images: ImageSchema,

});

// NGOSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("NGOModel", NGOSchema);