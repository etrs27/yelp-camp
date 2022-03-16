const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { campgroundSchema, reviewSchema } = require('../schemas.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in.')
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthorize = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission for that action.')
        return res.redirect(`/campgrounds/${campground.id}`)
    }
    next();
}

module.exports.isReviewAuthorize = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission for that action.')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(element => element.message).join(',')
        throw new ExpressError(400, msg)
    }
    else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { id } = req.params;
    const { rating } = req.body.review;
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        if (rating < 1 || rating > 5) {
            req.flash('error', 'Please select a rating between 1 to 5 stars.')
            return res.redirect(`/campgrounds/${id}`);
        }
        const msg = error.details.map(element => element.message).join(',')
        throw new ExpressError(400, msg)
    }
    else {
        next();
    }
}