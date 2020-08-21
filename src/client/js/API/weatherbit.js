// Get request to Weatherbit API
export const getFromWeatherbit = async () => {

    const response = await fetch(`/weatherbit`, {
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