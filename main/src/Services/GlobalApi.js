import axios from 'axios';

const apiKey = "d0ee56e7217a47749aabaee06fcfc3f1"; // Replace "your_api_key_here" with your actual API key
const baseURL = 'https://api.rawg.io/api';

const axiosInstance = axios.create({
    baseURL: baseURL,
    params: {
        key: apiKey
    }
});

const getGenreList = async () => {
    try {
        const response = await axiosInstance.get('/genres');
        return response.data;
    } catch (error) {
        console.error('Error fetching genre list:', error);
        throw error;
    }
};

const getGames = async () => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                page_size: 2000
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all games:', error);
        throw error;
    }
};

const getGameListByGenreId = async (id) => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                genres: id
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching games by genre ID:', error);
        throw error;
    }
};

export default {
    getGenreList,
    getGames,
    getGameListByGenreId,
};
