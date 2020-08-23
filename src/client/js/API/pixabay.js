// Get request to Pixabay API
export const getPixabayAPI = async (destination) => {

    try {
        const request = await fetch(`/pixabay/${destination}`);

        const data = await request.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};