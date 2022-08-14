const mongoose = require('mongoose');
const { Data, Data2 } = require('./Data');

const PatronModel = require('../Models/PatronModel');

function PatronSeed() {
    mongoose.connect('mongodb://localhost:27017/Social-Equity', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connected');
    });




    const seedDB = async() => {
        await PatronModel.deleteMany({});
        for (let i = 0; i < 10; i++) {
            const random1000 = Math.floor(Math.random() * 20);

            const Patrons = new PatronModel({
                email: `${Data[random1000].Email}`,
                name: `${Data[random1000].FirstName} ${Data[random1000].LastName}`,
                Images: {
                    Url: 'https://res.cloudinary.com/mrarthor/image//c_scale,w_200/v1660456481/Social-Equity/person_xgaybt.png',
                    FileName: 'Social-Equity/person_xgaybt.jpg'
                },

                PhoneNumber: `${Data2[random1000].PhoneNumber}`,
                Job: `${Data2[random1000].Job}`,
            });
            await Patrons.save();
        }
    };

    seedDB().then(() => {
        mongoose.connection.close();
    });
}

module.exports = PatronSeed;