// Get request to Pixabay API
export const getFromPixabayAPI = async () => {

    try {
        const request = await fetch(`/pixabay/${destination}`);

        const data = await request.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};