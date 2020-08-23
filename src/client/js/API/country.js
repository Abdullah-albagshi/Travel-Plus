// Get request to  Country API
export const getCountryAPI = async (geonames) => {

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