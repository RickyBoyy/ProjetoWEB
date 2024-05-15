import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import GlobalApi from "../Services/GlobalApi";
import TrendingGames from "../components/TrendingGames";
import GamesByGenreId from "../components/GamesByGenreId";

const GameListPage = () => {
    const { genreId } = useParams(); // Get genreId from route parameters
    const [gamesList, setGamesList] = useState([]);
    const [gameListByGenres, setGameListByGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameBanner, setGameBanner] = useState(null); // State to store the banner image URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gamesResp = await GlobalApi.getGames();
                setGamesList(gamesResp.results);
                
                const genreResp = await GlobalApi.getGameListByGenreId(genreId);
                setGameListByGenres(genreResp.results);

                if (genreResp.results.length > 0) {
                    setGameBanner(genreResp.results[0].background_image);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [genreId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <Banner gameBanner={gameBanner} />
            <TrendingGames gamesList={gamesList} />
            <GamesByGenreId gamesList={gameListByGenres} />
        </div>
    );
};

export default GameListPage;
