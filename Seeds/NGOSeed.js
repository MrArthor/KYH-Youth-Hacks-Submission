const mongoose = require('mongoose');
const NGOModel = require('../Models/NGOModel');
const { Data, Data2, NGO } = require('./Data');
async function NGOSeed() {

    mongoose.connect('mongodb://localhost:27017/Social-Equity', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connected');
    });

    console.log('NGOSeed');
    const seedDB = async() => {
        await NGOModel.deleteMany({});
        for (let i = 0; i < 10; i++) {
            const random1000 = Math.floor(Math.random() * 20);
            const NGOs = new NGOModel({
                name: NGO[random1000].name,
                PhoneNumber: NGO[random1000].Mobile,
                NameOfHead: NGO[random1000].ContactPerson,
                Location: NGO[random1000].Add + ' ' + NGO[random1000].Pin,
                About: NGO[random1000].Aim + ' ' + NGO[random1000].Purpose,
                Email: NGO[random1000].Email,
                Images: {
                    Url: 'https://res.cloudinary.com/mrarthor/image/upload/c_scale,w_200/v1660456621/Social-Equity/NGO_dzftst.jpg',
                    FileName: 'Social-Equity/NGO_dzftst.jpg'
                },

            });
            await NGOs.save();
        }
    };

    seedDB().then(() => {
        mongoose.connection.close();
    });
}

module.exports = NGOSeed;