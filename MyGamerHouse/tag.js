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
    tagElement.addEventListener("click", toggleTag);
    tagContainer.appendChild(tagElement);
  });
}
let selectedTags = [];

function toggleTag(event) {
  const clickedTag = event.target.textContent;

  if (selectedTags.includes(clickedTag)) {
    selectedTags = selectedTags.filter((tag) => tag !== clickedTag);
    event.target.classList.remove("selected");
  } else {
    if (selectedTags.length < 4) {
      selectedTags.push(clickedTag);
      event.target.classList.add("selected");
    } else {
      alert("You can select up to 4 tags.");
    }
  }
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
  var password = document.getElementsByName("Password")[0].value;
  var confirmPassword = document.getElementsByName("ConfirmPassword")[0].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  } else {
    window.location.replace("tags.html");
    return true;
  }
}

function redirectToNav() {
  window.location.replace("index.html");
}
