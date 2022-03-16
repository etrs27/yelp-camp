const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthorize } = require('../utilities/middleware');
const reviews = require('../controllers/reviews');

router.post(
    '/', 
    isLoggedIn, 
    validateReview, 
    catchAsync(reviews.add))

router.delete(
    '/:reviewId', 
    isLoggedIn, 
    isReviewAuthorize, 
    catchAsync(reviews.delete))

module.exports = router;