import React, { useEffect, useState } from "react";
import "../App.css";

const Tags = ({}) => {
  const [randomTags, setRandomTags] = useState([]);

  const redirectToHome = () => {
    window.location.href = "/";
  };

  const generateRandomTags = () => {
    const numberOfTags = Math.floor(Math.random() * 5) + 1;
    const shuffledTags = tags.sort(() => 0.5 - Math.random());
    const selectedTags = shuffledTags.slice(0, numberOfTags);
    setRandomTags(selectedTags);
  };
  const handleSubmit = () => {
    console.log("Submit selected tags");
    redirectToHome();
  };
  const tags = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Puzzle",
    "Horror",
    "FPS",
    "Sports",
    "Racing",
    "Platformer",
    "Indie",
    "Open World",
    "Survival",
    "Multiplayer",
    "Stealth",
    "Science Fiction",
    "Fantasy",
    "Historical",
    "Exploration",
    "Hack and Slash",
    "Turn-Based",
    "Card Game",
    "MOBA",
    "MMORPG",
    "Co-op",
    "Single Player",
    "Tactical",
    "Artificial Intelligence",
    "Story-Driven",
  ];

  const toggleTag = (event) => {
    const clickedTag = event.target;
    const isSelected = clickedTag.classList.contains("selected");

    if (isSelected) {
      clickedTag.classList.remove("selected");
      clickedTag.style.cursor = "default"; // Set cursor to default
    } else {
      const selectedTags = document.querySelectorAll(".tag.selected");
      if (selectedTags.length < 4) {
        clickedTag.classList.add("selected");
        clickedTag.style.cursor = "pointer"; // Set cursor to pointer
      } else {
        alert("You can select up to 4 tags.");
      }
    }
  };

  return (
    <div className="choose_tags">
      <div className="card_tags">
        <h1>
          What type of gamer are you?
          <br />
          Choose four tags:
        </h1>
        <div className="tag_placement">
          {tags.map((tag, index) => (
            <div key={index} className="tag" onClick={toggleTag}>
              {tag}
            </div>
          ))}
        </div>
        <button className="btn_done" onClick={handleSubmit}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Tags;
