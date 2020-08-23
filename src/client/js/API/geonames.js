// Get request to Geonames API
export const getGeonamesAPI = async (destination) => {
    try {
        const request = await fetch(`/geonames/${destination}`);
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
};