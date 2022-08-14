const mongoose = require('mongoose');
const ChildModel = require('../Models/ChildModel');
const { Data, Data2, Data1, NGO } = require('./Data');

async function ChildSeed() {
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
        await ChildModel.deleteMany({});
        for (let i = 0; i < 10; i++) {
            const random1000 = Math.floor(Math.random() * 10);
            const Childs = new ChildModel({
                name: Data[random1000].FirstName + ' ' + Data[random1000].LastName,
                ParentName: Data[random1000 + 1 + i].FirstName + ' ' + Data[random1000].LastName,
                PhoneNumber: Data2[random1000].PhoneNumber,
                SpecialSkills: Data1[random1000].Skills,
                Age: random1000,
                Needs: Data1[random1000].Needs,
                Location: NGO[random1000].Add,
                Images: {
                    Url: 'https://res.cloudinary.com/mrarthor/image/upload/c_scale,w_200/v1660456119/Social-Equity/child_afrd0u.jpg',
                    FileName: 'Social-Equity/child_afrd0u.jpg'
                },
            });

            await Childs.save();
        }
    };

    seedDB().then(() => {
        mongoose.connection.close();
    });
}

module.exports = ChildSeed;