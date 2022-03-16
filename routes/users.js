const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users');

router.route('/register')
    .get(users.create)
    .post(catchAsync(users.add))

router.route('/login')
    .get(users.permission)
    .post(
        passport.authenticate('local', 
        { failureFlash: true, failureRedirect: '/login' }), 
        users.access)

router.get('/logout', users.revoke)

module.exports = router;