const express = require('express');
const router = express.Router();
const TravelModel = require('../models/TravelModel');
const fetch = require('node-fetch');



// Get request to Geonames API
router.get('/geonames/:destination', async (req, res) => {

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
router.get('/pixabay/:destination', async (req, res) => {

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
router.post('/weatherbit', async (req, res) => {

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
router.post('/save', async (req, res) => {

  try {
    let { geonames, weather, country, pix } = req.body;

    // Convert the json to string to store it in DB
    geonames = JSON.stringify(geonames);
    weather = JSON.stringify(weather);
    country = JSON.stringify(country);
    pix = JSON.stringify(pix);

    // Add Travel to the DB
    await TravelModel.create({ geonames, weather, country, pix });

    res.status(200).json({
      success: true,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }
});




module.exports = router;
