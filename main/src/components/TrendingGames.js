import React, { useEffect } from "react";
import "../App.css";

function TrendingGames({ gamesList }) {
    useEffect(() => {
        console.log(gamesList);
    }, [gamesList]);

    // No need to check if gamesList is an array since it should be passed correctly from the parent component

    return (
        <div className="trending-games-container">
            <h2 className="trending-games-title">Trending Games</h2>
        <div className="trending-games">
            {gamesList.map((item, index) => index < 4 && (
                <div className="trending-games-port" key={index}> {/* Adding a key to each mapped item */}
                    <img className="trending-games-image" src={item.background_image} alt={`Trending game ${index + 1}`} />
                    <h2 className="trending-games-name">{item.name}</h2>
                </div>
            ))}
        </div>
        </div>
    );
}

export default TrendingGames;
