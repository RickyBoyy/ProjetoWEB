import React, { useEffect } from "react";

function GamesByGenreId({ gamesList }) {
    useEffect(() => {
        console.log("GameList", gamesList);
    }, []);

    return (
        <div>
            <h2 className="games-list-title">Games</h2>

            <div className="games-list">
                {gamesList.map((item) => (
                    <div className="games-list-container" key={item.id}>
                        <img src={item.background_image} className="games-image" alt={item.name} />
                        <h2>{item.name} <span className="review-tag">{item.metacritic}</span></h2>
                        <h2>⭐{item.rating}💬{item.reviews_count}🔥{item.suggestions_count}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesByGenreId;
