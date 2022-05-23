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
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            // Your User ID
            author: '622f92d0292ca9568cbe5d63',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quaerat optio error sint quo at maxime expedita odit nesciunt animi, consectetur, iure voluptatem.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/etrs27/image/upload/v1648241974/Yelp-Camp/page-images/t0rmaf1kabu7lu0xdi2i.jpg',
                    filename: 'Yelp-Camp/page-images/t0rmaf1kabu7lu0xdi2i'
                },
                {
                    url: 'https://res.cloudinary.com/etrs27/image/upload/v1648241974/Yelp-Camp/page-images/campfire_qkxcaf.jpg',
                    filename: 'Yelp-Camp/page-images/campfire_qkxcaf.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/etrs27/image/upload/v1648241974/Yelp-Camp/page-images/relaxing-in-tent_uli8ci.jpg',
                    filename: 'Yelp-Camp/page-images/relaxing-in-tent_uli8ci.jpg'
                }
            ],
            reviews: '623cbb51af5da339c7069a7a'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});