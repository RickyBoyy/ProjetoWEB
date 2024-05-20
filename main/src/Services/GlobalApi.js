import axios from 'axios';

const apiKey = "d0ee56e7217a47749aabaee06fcfc3f1";
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
                genres: id,
                page_size: 2000
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching games by genre ID:', error);
        throw error;
    }
};

const searchGames = async (query) => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                search: query,
                page_size: 2000
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching for games:', error);
        throw error;
    }
};
const searchSuggestions = async (query) => {
    try {
      const response = await axiosInstance.get('/games', {
        params: {
          search: query,
          page_size: 5  // Limitar o número de sugestões
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      throw error;
    }
  };
  const getGameDetailsById = async (id) => {
    try {
      const response = await axiosInstance.get(`/games/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  };
  
  // Add this method to your API exports
  export default {
    getGenreList,
    getGames,
    getGameListByGenreId,
    searchGames,
    searchSuggestions,
    getGameDetailsById
  };
  