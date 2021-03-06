const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.add = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'You have successfully created a new review!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.delete = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'You have successfully deleted the review!')
    res.redirect(`/campgrounds/${id}`);
}