const Campground = require('../models/campground');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.create = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.add = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground)
    req.flash('success', 'You have successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.read = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', "Cannot find that campground!");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/details', { campground });
}

module.exports.edit = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', "Cannot find that campground!");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.update = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(
        id, 
        { ...req.body.campground }, 
        { new: true })
    req.flash('success', 'You have successfully updated the campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id)
    req.flash('success', 'You have successfully deleted the campground!')
    res.redirect('/campgrounds')
}