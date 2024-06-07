// services/GlobalApi.js
import axios from 'axios';

const apiKey = "d0ee56e7217a47749aabaee06fcfc3f1";
const baseURL = 'https://api.rawg.io/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  params: {
    key: apiKey
  }
});

// Helper function to log errors
const logError = (error, context) => {
  if (error.response) {
    // Request made and server responded
    console.error(`Error in ${context}:`, error.response.data);
  } else if (error.request) {
    // Request made but no response received
    console.error(`No response received in ${context}:`, error.request);
  } else {
    // Something happened in setting up the request
    console.error(`Error in setting up request in ${context}:`, error.message);
  }
  console.error('Error config:', error.config);
};

const getGenreList = async () => {
  try {
    const response = await axiosInstance.get('/genres');
    return response.data;
  } catch (error) {
    logError(error, 'getGenreList');
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
    logError(error, 'getGames');
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
    logError(error, 'getGameListByGenreId');
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
    logError(error, 'searchGames');
    throw error;
  }
};

const searchSuggestions = async (query) => {
  try {
    const response = await axiosInstance.get('/games', {
      params: {
        search: query,
        page_size: 5  // Limiting the number of suggestions
      }
    });
    return response.data;
  } catch (error) {
    logError(error, 'searchSuggestions');
    throw error;
  }
};

const getGameDetailsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    logError(error, 'getGameDetailsById');
    throw error;
  }
};

const GlobalApi = {
  getGenreList,
  getGames,
  getGameListByGenreId,
  searchGames,
  searchSuggestions,
  getGameDetailsById,
  getReviewsByGameId: async (id) => {
    const response = await fetch(`https://projetoweb-13.onrender.com/reviews/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  },
  createReview: async (review) => {
    const response = await fetch('https://projetoweb-13.onrender.com/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }

};

export default GlobalApi;
