const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PatronModel = require('./PatronModel');
const NGOModel = require('./NGOModel');
const ImageSchema = new Schema({
    Url: String,
    FileName: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.Url.replace('/upload', '/upload/w_200');
});

const ChildSchema = new Schema({
    name: String,
    Images: ImageSchema,
    Location: String,
    ParentName: String,
    PhoneNumber: String,
    Needs: String,
    Age: Number,
    SpecialSkills: String,
    isAdopted: {
        type: Boolean,
        default: false
    },
    Patron: {
        type: Schema.Types.ObjectId,
        ref: 'PatronModel',
    },
    NGO: {
        type: Schema.Types.ObjectId,
        ref: 'NGOModel',
    },
});
module.exports = mongoose.model("ChildModel", ChildSchema);