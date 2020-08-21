const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const TravelModel = require('../../models/TravelModel');


// Load config
require('dotenv').config({ path: './config/config.env' });


// Start up an instance of app
const app = express();

// Connect to the database
connectDB();



// Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());



// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`The server is running on port number: ${PORT}`); });


// Get request to Geonames API
app.get('/geonames/:destination', async (req, res) => {

    const destination = req.params.destination;

    // Get the key and the url from env
    const geonamesURL = process.env.GEO_NAME_URL;

    const geonamesKey = process.env.GEO_KEY;
    try {
        // Request the server
        const response = await fetch(`${geonamesURL}?q=${destination}&username=${geonamesKey}`);

        const data = await response.json();

        res.json(data);

    } catch (error) {
        console.log(error);
    }
});

// GET request to Pixabay API
app.get('/pixabay/:destination', async (req, res) => {

    const destination = req.params.destination;
    // Remove the whites spaces from the destination
    let destinationWithoutSpace = destination.split(' ');
    destinationWithoutSpace = destinationWithoutSpace.join('+');

    const pixabayURL = process.env.PIX_URL;

    const pixabayKey = process.env.PIX_KEY;
    const request = await fetch(`${pixabayURL}/?&image_type=photo&q=${destinationWithoutSpace}&key=${pixabayKey}`);

    try {
        const data = await request.json();
        res.json(data);

    } catch (error) {
        console.log(error);
    }
});

// GET request to Weatherbit API
app.post('/weatherbit', async (req, res) => {

    const gedoData = req.body;
    const lat = gedoData.latitude;
    const lng = gedoData.longitude;

    const weatherbitURL = process.env.WEATHER_URL;

    const weatherbitKey = process.env.WEATHER_KEY;

    const request = await fetch(`${weatherbitURL}?&lat=${lat}&lon=${lng}&key=${weatherbitKey}`);
    try {
        const data = await request.json();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

// Save travel data to the DB
app.post('/save', async (req, res) => {

    try {
        const data = req.body;

        console.log('data', data);
        // Add Travel to the DB
        const newTravel = await TravelModel.create(data);
    }
    catch (error) {
        res.status(500).json({
            success: false,
        });
    }
    res.status(200).json({
        success: true,
    });
});




exports.app = app;