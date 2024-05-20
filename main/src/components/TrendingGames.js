import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Importar o componente Link do react-router-dom
import "../App.css";

function TrendingGames({ gamesList }) {
    useEffect(() => {
        console.log(gamesList);
    }, [gamesList]);

    return (
        <div className="trending-games-container">
            <h2 className="trending-games-title">Trending Games</h2>
            <div className="trending-games">
                {gamesList.map((item, index) => index < 4 && (
                    // Envolver cada jogo em destaque com um Link
                    <Link to={`/games/${item.id}`} key={index} className="trending-games-port">
                        <img className="trending-games-image" src={item.background_image} alt={`Trending game ${index + 1}`} />
                        <h2 className="trending-games-name">{item.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );  
}

export default TrendingGames;
