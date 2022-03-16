const User = require('../models/user');

module.exports.create = (req, res) => {
    res.render('users/register')
}

module.exports.add = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('register');
    }
}

module.exports.permission = (req, res) => {
    res.render('users/login')
}

module.exports.access = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.revoke = (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out.')
    res.redirect('/campgrounds')
}