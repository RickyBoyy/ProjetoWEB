import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function GamesByGenreId({ genre, gamesList }) {
  useEffect(() => {
    console.log("GameList", gamesList);
  }, [gamesList]);

  return (
    <div>
      <h2 className="games-list-title">{genre} Games</h2>
      <div className="games-list">
        {gamesList.map((item) => (
          <Link to={`/games/${item.id}`} key={item.id} className="games-list-container">
            <img src={item.background_image} className="games-image" alt={item.name} />
            <h2>{item.name} <span className="review-tag">{item.metacritic}</span></h2>
            <h2>⭐{item.rating}💬{item.reviews_count}🔥{item.suggestions_count}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GamesByGenreId;
