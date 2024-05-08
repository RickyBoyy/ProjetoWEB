// GlobalApi.js

import axios from 'axios';

const key = "eaf0f68f17cf4a7a96cf0ffc9279417f";
const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api'
});

const getGenreList = async () => {
    try {
        const response = await axiosInstance.get('/genres?key=' + key);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching genre list:', error);
        throw error; // Re-throw the error
    }
};

export default {
    getGenreList
};
