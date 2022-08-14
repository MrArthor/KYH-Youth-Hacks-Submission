const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const Flash = require("connect-flash");
const methodOverride = require("method-override");
const ChildrenRouter = require("./Routers/ChildrenRouter");
const NGORouter = require("./Routers/NGORouter");
const PatronRouter = require("./Routers/PatronRouter");
const app = express();
const UserRoutes = require("./Routers/UserRouter");
const bodyParser = require('body-parser');
const Passport = require("passport");
const LocalPassport = require("passport-local");
const MongoSanitize = require("express-mongo-sanitize");
const UserModel = require("./Models/UserModel");
const ExpressError = require("./utils/ExpressError");
const ContactRouter = require("./Routers/ContactRouter");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Social-Equity", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "View"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'Public')))
const SessionConfig = {
    secret: 'Thisshoudbebettersecret1',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(SessionConfig))
app.use(Flash())

app.use(Passport.initialize());
app.use(Passport.session());

Passport.use(new LocalPassport(UserModel.authenticate()));
Passport.serializeUser(UserModel.serializeUser());
Passport.deserializeUser(UserModel.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.Error = req.flash('error');
    res.locals.CurrentUser = req.user;

    next();
})

app.use("/NGO", NGORouter);
app.use('/Patron', PatronRouter);
app.use('/User', UserRoutes);
app.use('/Children', ChildrenRouter);
app.use('/Contact', ContactRouter);
app.get('/About', (req, res) => {
    const title = "About Us";
    res.render('AboutUs', { title });
});
app.get("/", (req, res) => {
    const title = 'Home Page';
    res.render("home", { title });
});
app.all("*", (req, res, next) => {

    next(new ExpressError("What The Happened  Now??????", 404));
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    const title = 'Error Page'

    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).render("error", { err, title });
});
app.listen(9483, () => {
    console.log("Serving on port 9483");
});