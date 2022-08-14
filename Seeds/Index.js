const Patron = require('./PatronSeed');
const Child = require('./ChildSeed');
const NGO = require('./NGOSeed');
async function Seed() {
    await Patron();
    // await Child();
    //await NGO();
}
Seed();