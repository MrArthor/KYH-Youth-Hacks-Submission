const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    Url: String,
    FileName: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.Url.replace('/upload', '/upload/w_200');
});

const ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    query: String,

});
module.exports = mongoose.model("ContactModel", ContactSchema);