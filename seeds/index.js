const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '622f92d0292ca9568cbe5d63',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quaerat optio error sint quo at maxime expedita odit nesciunt animi, consectetur, iure voluptatem.',
            price,
            images:  [
                {
                    url: 'https://res.cloudinary.com/etrs27/image/upload/v1647713540/Yelp-Camp/xkyvupludcdazoulovgr.jpg',
                    filename: 'Yelp-Camp/xkyvupludcdazoulovgr'
                },
                {
                    url: 'https://res.cloudinary.com/etrs27/image/upload/v1647713540/Yelp-Camp/t0rmaf1kabu7lu0xdi2i.jpg',
                    filename: 'Yelp-Camp/tkth60mucimrcgiwkqhn'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});