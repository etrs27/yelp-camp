const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthorize, validateCampground } = require('../utilities/middleware');
const campgrounds = require('../controllers/campgrounds');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(
        isLoggedIn, 
        validateCampground, 
        catchAsync(campgrounds.add))

router.get('/new', isLoggedIn, campgrounds.create)

router.route('/:id')
    .get(catchAsync(campgrounds.read))
    .put(
        isLoggedIn, 
        isAuthorize, 
        validateCampground, 
        catchAsync(campgrounds.update))
    .delete(
        isLoggedIn, 
        isAuthorize, 
        catchAsync(campgrounds.delete))

router.get('/:id/edit', isLoggedIn, isAuthorize, catchAsync(campgrounds.edit))

module.exports = router;