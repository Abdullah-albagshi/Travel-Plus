import { getGeonamesAPI } from './API/geonames';
import { getCountryAPI } from './API/country';
import { getWeatherbit } from './API/weatherbit';
import { getPixabayAPI } from './API/pixabay';

/* Global Variables */
let geonames, weather, country, pix,
    duration, startDate, endtDate,
    destination, countdown;

const moment = require('moment');


// Spinner
let spinner = document.getElementById('spinner');





/* Main Functions */

// Create trip according to the user trip data, then invoke the User Interface
export const createTrip = async (e) => {

    // Get the user input from the dom
    startDate = moment(document.getElementById('startDate').value);
    endtDate = moment(document.getElementById('endDate').value);
    destination = document.getElementById('destination').value;

    if (!checkAlert()) {
        return;
    }

    await removeTrip();

    spinner.style.visibility = 'visible';

    // Call the apis 
    geonames = await getGeonamesAPI(destination);


    if (!geonames) {
        document.getElementById('country-alert').style.display = 'block';
        spinner.style.visibility = 'hidden';
        return;
    }
    else {
        document.getElementById('country-alert').style.display = 'none';
    }

    weather = await getWeatherbit(geonames);
    country = await getCountryAPI(geonames);
    pix = await getPixabayAPI(destination);

    spinner.style.visibility = 'hidden';

    // Save trip in the DB
    saveTrip();

    // Update the ui
    updateUiDuration();
    updateUiWeather();
    updateUiCountry();


};




// Remove the trip from the User Interface
export const removeTrip = async () => {
    document.getElementById('temp').innerHTML = '';
    document.getElementById('duration').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('countryInfo').innerHTML = '';
};

// Save the trip in mongodb 
export const saveTrip = async () => {
    try {
        const travelData = { geonames, weather, country, pix };
        await fetch(`/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(travelData)
        });
    } catch (error) {
        console.log(error);
    }
};


export const checkAlert = () => {

    if (!startDate || !endtDate || !destination) {
        document.getElementById('empty-alert').style.display = 'block';
        return false;
    }
    else {
        document.getElementById('empty-alert').style.display = 'none';
    }

    countdown = startDate.diff(moment(Date.now()), 'days');
    if (countdown < 0) {
        document.getElementById('start-alert').style.display = 'block';
        return false;
    }
    else {
        document.getElementById('start-alert').style.display = 'none';
    }

    duration = endtDate.diff(startDate, 'days');

    if (duration < 0) {
        document.getElementById('date-alert').style.display = 'block';
        return false;
    }
    else {
        document.getElementById('date-alert').style.display = 'none';
    }

    return true;

};


// :: UPDATE UI ::

export const updateUiDuration = () => {
    const dura = `<strong>Duration of your trip:</strong> ${duration} day(s)`;
    document.getElementById('duration').innerHTML = dura;
};


export const updateUiCountry = () => {

    const countryInfo = `<h3>${countdown} day(s) to go!</h3>
                        <br>
                        <strong>Country information:</strong>
                        <br>
                        The counrty you want to visit is ${country.name}, and the capital is ${country.capital}. ${country.name} is located in ${country.region} 
                        region, and the population is estimated at ${country.population} people. 
                        The main language is ${country.language} language, and ${country.currency} is the official currency.
                        ${country.timezone} is the time zone used in ${country.name}.`;
    document.getElementById('countryInfo').innerHTML = countryInfo;

    const content = `<img src=${pix.hits[0].webformatURL} alt=${destination}>
                            <br>
                            <div id="caption">${destination}</div>`;
    document.getElementById('content').innerHTML = content;
};

export const updateUiWeather = () => {
    let date = new Date(startDate).getTime();
    let counter = 1;
    let temp = `
    <table class="table table-striped" style="text-align:center;">
    <thead>
      <tr>
      <th colspan="2"> Weather forcast </th> 
      </tr>
      <tr>
        <th scope="col">Day</th>
        <th scope="col">Temperature</th>
      </tr>
    </thead>
    <tbody>`;
    // Find the correct date from 16 date forcast array
    for (let i = 0; i < weather.length; i++) {
        let weatherDate = new Date(weather[i].datetime).getTime();
        if (weatherDate >= date) {
            temp += `<tr>
                    <th scope="row">${counter}</th>
                    <td>${weather[i].temp}&#8451;</td>
                    </tr> `;
            if (counter == duration || counter == 10 || duration == 0) {
                temp += ` </tbody>
                        </table>`  ;
                break;
            }
            counter++;
        }
    }
    

    document.getElementById('temp').innerHTML = temp;
};