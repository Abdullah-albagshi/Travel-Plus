const fetch=require('node-fetch');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// Start up an instance of app

const app=express();

// Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const PORT = process.env.PORT ||  8080;

app.listen(PORT, () => { console.log(`The server is running on port number: ${PORT}`); });


// get request to Geonames API
app.get('/geonames/:destination', async (req, res) => {

    const destination=req.params.destination;

    // Get the key and the url from env
    const geonamesURL=process.env.GEO_NAME_URL;

    const geonamesKey=process.env.GEO_KEY;
    try {
    // Request the server
    const response = await fetch(geonamesURL + destination + geonamesKey);
    
        const data = await response.json();

        res.json(data);

    } catch (error) {
        console.log(error);
    }
});

// get request to Geonames API
app.get('/pixabay/:destination', async (req, res) => {


    // Remove the whites spaces from the destination
    let destinationWithoutSpace = destination.split(' ');
    destinationWithoutSpace = destinationWithoutSpace.join('+');

    const pixabayURL=process.env.PIX_URL;

    const pixabayKey=process.env.PIX_KEY;

    const request = await fetch(pixabayURL + destinationWithoutSpace + pixabayKey);

    try {
        const data = await request.json();
        res.json(data);

    } catch (error) {
        console.log(error);
    }
});

app.get('/weatherbit/:geoData', async (req, res) => {

    const geoData=req.params.geoData;

    const lat = geoData.latitude;
    const lng = geoData.longitude;

    const weatherbitURL=process.env.WEATHER_URL;

    const weatherbitKey=process.env.WEATHER_KEY;

    const request = await fetch(weatherbitURL + `?&lat=${lat}&lon=${lng}` + weatherbitKey);
    try {
        const data = await request.json();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});



exports.app = app;