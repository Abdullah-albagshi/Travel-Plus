/* Global Variables */
let geonames, weather, country, pix,
    duration, startDate, endtDate, destination;

const moment = require('moment');


// Spinner
let spinner = document.getElementById('spinner');

/* Asynchronous Functions */


// Get request to Geonames API
export const getFromGeonamesAPI = async () => {
    try {
        const request = await fetch(`http://localhost:8080/geonames/${destination}`);
        const data = await request.json();
        const geonamesData = data.geonames[0];
        const geo = {
            country: geonamesData.countryName,
            latitude: geonamesData.lat,
            longitude: geonamesData.lng
        };
        return geo;

    } catch (error) {
        console.log(error);
    }
}

// Get request to Pixabay API
export const getFromPixabayAPI = async () => {

    try {
        const request = await fetch(`http://localhost:8080/pixabay/${destination}`);

        const data = await request.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

// Get request to Weatherbit API
export const getFromWeatherbit = async () => {

    const response = await fetch(`http://localhost:8080/weatherbit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(geonames)
    });
    try {
        const data = await response.json();
        const weatherData = data.data;
        return weatherData;
    } catch (error) {
        console.log(error);
    }
};

// Get request to  Country API
export const getFromCountryAPI = async () => {

    const country = geonames.country;

    const countryAPI = 'https://restcountries.eu/rest/v2/name/';
    const request = await fetch(countryAPI + country);
    try {
        const data = await request.json();
        const countryData = data[0];
        const result = {
            name: countryData.name,
            capital: countryData.capital,
            currency: countryData.currencies[0].code,
            language: countryData.languages[0].name,
            population: countryData.population,
            region: countryData.region,
            timezone: countryData.timezones[0]
        };
        return result;
    } catch (error) {
        console.log(error);
    }
};



/* Main Functions */

// Create trip according to the user trip data, then invoke the User Interface
export const createTrip = async () => {

    // Get the user input from the dom
    startDate = moment(document.getElementById('startDate').value);
    endtDate = moment(document.getElementById('endDate').value);
    destination = document.getElementById('destination').value;

    if (!startDate || !endtDate || !destination) {
        document.getElementById('empty-alert').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    else {
        document.getElementById('empty-alert').style.display = 'none';
    }


    duration = endtDate.diff(startDate, 'days');

    if (duration < 0) {
        document.getElementById('date-alert').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    else {
        document.getElementById('date-alert').style.display = 'none';
    }



    spinner.style.visibility = 'visible';
    // Call the apis 
    geonames = await getFromGeonamesAPI();
    weather = await getFromWeatherbit();
    country = await getFromCountryAPI();
    pix = await getFromPixabayAPI();

    spinner.style.visibility = 'hidden';

    // Save trip in the DB
    saveTrip();

    // Update the ui
    updateUiDuration();
    updateUiWeather();
    updateUiCountry();



};

// Remove the trip from the User Interface
export const removeTrip = () => {
    document.getElementById('temp').innerHTML = '';
    document.getElementById('duration').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('countryInfo').innerHTML = '';
};

// Remove the trip from the User Interface
export const saveTrip = async (travelData) => {
    try {
        const travelData = { geonames, weather, country, pix };
        await fetch(`http://localhost:8080/save`, {
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






// :: UPDATE UI ::

export const updateUiDuration = () => {
    const dura = `<strong>Duration of your trip:</strong> ${duration} day(s)`;
    document.getElementById('duration').innerHTML = dura;
};


export const updateUiCountry = () => {
    const countdown = startDate.diff(moment(Date.now()), 'days');
    const countryInfo = `<h3>${countdown} day(s) to go!</h3>
                        <br>
                        <strong>Country information:</strong>
                        <br>
                        The counrty you want to visit is ${country.name}, and the capital city of ${country.name} is ${country.capital}. ${country.name} is located in ${country.region} region, and the population is estimated at ${country.population} people. The main language in ${country.name} is ${country.language} language, and ${country.currency} is the official currency of ${country.name}. ${country.timezone} is the time zone used in ${country.name}.`;
    document.getElementById('countryInfo').innerHTML = countryInfo;

    const content = `<img src=${pix.hits[0].webformatURL} alt=${destination}>
                            <br>
                            <div id="caption">${destination}</div>`;
    document.getElementById('content').innerHTML = content;
};

export const updateUiWeather = () => {
    let a = new Date(startDate).getTime();
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

        let b = new Date(weather[i].datetime).getTime();
        if (b >= a) {
            temp += `<tr>
                    <th scope="row">${counter}</th>
                    <td>${weather[i].temp}&#8451;</td>
                    </tr> `;
            if (counter == 5) {
                temp += ` </tbody>
                        </table>`  ;
                break;
            }
            counter++;
        }
    }
    document.getElementById('temp').innerHTML = temp;
};