const express = require('express');
const cors = require('cors');
require('colors');
const connectDB = require('./config/db');


// Load config
require('dotenv').config({ path: './src/server/config/config.env' });


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

app.use(require('./routes/indexRoute'));

// Setup Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`The server is running on port number: ${PORT}`); });




exports.app = app;