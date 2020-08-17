/* Global Variables */

  // Request the apis 
  let geonames;
  let weather ;
  let country;
  let pix ;

// hold the value of the input element that entered by the user
let spinner = document.getElementById('spinner');

/* Asynchronous Functions */


// Get request to Geonames API
export const getFromGeonamesAPI = async (destination) => {
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
export const getFromPixabayAPI = async (destination) => {

    try {
    const request = await fetch(`http://localhost:8080/pixabay/${destination}`);

        const data = await request.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

// Get request to Weatherbit API
export const getFromWeatherbit = async (geoData) => {

    const response = await fetch(`http://localhost:8080/weatherbit`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(geoData)
    });
    try {
        const data = await response.json();

        const weatherData = data.data;

        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

// Get request to  Country API
export const getFromCountryAPI = async (countData) => {

    const country = countData.country;

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
export const createTrip = async() => {

    // Get the user input from the dom
    const startDate = document.getElementById('startDate').value;
    const endtDate = document.getElementById('endDate').value;
    const duration = subtractDates(startDate, endtDate);
    const destination = document.getElementById('destination').value;

    // Request the apis 
    geonames =await getFromGeonamesAPI(destination);
    console.log("createTrip -> geonames", geonames);
    weather =await getFromWeatherbit(geonames);
    console.log("createTrip -> weather", weather);
    country =await getFromCountryAPI(geonames);
    console.log("createTrip -> country", country);
    pix =await getFromPixabayAPI(destination);
    console.log("createTrip -> pix", pix);


   
    updateUI(duration, startDate,destination);


}

// Remove the trip from the User Interface
export const removeTrip = () => {
    document.getElementById('temp').innerHTML = '';
    document.getElementById('duration').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('countryInfo').innerHTML = '';
}

// Update user interface according to the data stored in express server
export const updateUI = (duration, startDate,destination) => {

    spinner.innerHTML = '';
    const countdown = getCountdown(startDate);
    const dura = `<strong>Duration of your trip:</strong> ${duration} day(s)`;
    document.getElementById('duration').innerHTML = dura;

    updateUiWeather(startDate,weather);
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

}


// Calculate the remaining days to go to the trip (countdown)
export const countdown = (startDate) => {

    let todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    todayDate = year + '-' + month + '-' + day;

    const daysLeft = subtractDates(todayDate, startDate);
    return daysLeft;
}

// Calculate the difference between two dates
export const subtractDates = (dateOne, dateTwo) => {
    const d1 = Date.parse(dateOne);
    const d2 = Date.parse(dateTwo);

    const difference = d2 - d1;

    const result = Math.ceil(difference / 86400000);
    return result;
}

export const updateUiWeather=(startDate,data)=>{
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
    console.log('data :>> ', data);
    // find the correct date from 16 date forcast array
    for (let i = 0; i < data.length; i++) {

        let b = new Date(data[i].datetime).getTime();
        console.log('b',b);
        if (b >= a) {
            temp += `<tr>
                    <th scope="row">${counter}</th>
                    <td>${data[i].temp}&#8451;</td>
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
}

// Calculate the remaining days to go to the trip (countdown)
export const getCountdown = (startDate) => {

    let todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    todayDate = year + '-' + month + '-' + day;

    const daysLeft = subtractDates(todayDate, startDate);
    return daysLeft;
}