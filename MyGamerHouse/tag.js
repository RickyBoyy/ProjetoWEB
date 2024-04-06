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

function generateTags() {
  const tagContainer = document.getElementById("tag_placement");

  tagContainer.innerHTML = "";

  tags.forEach((tag) => {
    const tagElement = document.createElement("div");
    tagElement.textContent = tag;
    tagElement.classList.add("tag");
    tagContainer.appendChild(tagElement);
  });
}
function showFourTags() {
  const tagContainer = document.getElementById("tag_4placement");
  tagContainer.innerHTML = "";

  const selectedTags = tags.slice(0, 4);

  selectedTags.forEach((tag) => {
    const tagElement = document.createElement("div");
    tagElement.textContent = tag;
    tagElement.classList.add("tag");
    tagContainer.appendChild(tagElement);
  });
}

window.onload = generateTags;
function redirectToTags() {
  window.location.replace("tags.html");
}
function redirectToNav() {
  window.location.replace("index.html");
}
