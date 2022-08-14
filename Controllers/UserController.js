const passport = require('passport');
const UserModel = require('../Models/UserModel');

module.exports.RegisterRender = (req, res) => {
    const title = 'Register';
    res.render("Users/Register", { title });
}

module.exports.NewUser = async(req, res, next) => {
    try {
        const { email, username, password, Submission } = req.body;
        const User = new UserModel({ email, username, Submission });
        const registeredUser = await UserModel.register(User, password);

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('Success', 'Welcome to Portal!');
            if (Submission == 'Patron')
                res.redirect('/Patron/Add');
            else if (Submission == 'NGO')
                res.redirect('/NGO/Add');
        })
    } catch (e) {
        req.flash('Error', e.message);
        console.log(e.message);
        res.redirect('register');
    }
}

module.exports.LoginRender = (req, res) => {
    const title = 'Login';
    res.render('Users/login', { title });
}

module.exports.LoginCredentials = (req, res) => {
    req.flash('success', 'welcome back!');

    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.Logout = (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }

        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
}