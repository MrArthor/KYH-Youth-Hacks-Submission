const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PassportLocalMongoose = require('passport-local-mongoose');
const PatronModel = require('./PatronModel');
const NGOModel = require('./NGOModel');
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    Submission: String,
    PatronObject: {
        type: Schema.Types.ObjectId,
        ref: 'PatronModel'
    },
    NGOObject: {
        type: Schema.Types.ObjectId,
        ref: 'NGOModel'
    }


});

UserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model('UserModel', UserSchema);