//Js do Profile

var changeBackgroundButton = document.getElementById("changeBackgroundButton");
var changeBackgroundButtonPrev = document.getElementById(
  "changeBackgroundButtonPrev"
);

var backgrounds = [
  "url('https://tse4.mm.bing.net/th?id=OIP.gH5VltaBUyLu0xE_Sd8VxAHaLH&pid=Api&P=0&h=220')",
  "url('https://tse2.mm.bing.net/th?id=OIP.hGN3RmQSNBfckbVvhZiuPAHaK-&pid=Api&P=0&h=220')",

  // Adicione mais URLs de imagens conforme necessário
];

var currentBackgroundIndex = 0;

changeBackgroundButton.addEventListener("click", function () {
  changeBackground(1); // Next
});

changeBackgroundButtonPrev.addEventListener("click", function () {
  changeBackground(-1); // Previous
});

window.onload = function () {
  updateBackground();
};

function changeBackground(step) {
  currentBackgroundIndex =
    (currentBackgroundIndex + step + backgrounds.length) % backgrounds.length;
  updateBackground();
}

function updateBackground() {
  var body = document.body;
  body.style.backgroundImage = backgrounds[currentBackgroundIndex];
  body.style.backgroundPosition = "left top";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "contain";
}

function redirectToTags(event) {
  event.preventDefault(); // Prevent the default form submission action

  var password = document.getElementsByName("Password")[0].value;
  var confirmPassword = document.getElementsByName("ConfirmPassword")[0].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  } else {
    alert("Registration successful!");
    window.location.href = window.location.href; // Redirect to the same page
    return true;
  }
}

// Attach the function to the click event of the register button
document
  .querySelector(".btn_register")
  .addEventListener("click", redirectToTags);

//Js das Tags

/*const tags = [
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
  
  window.onload = generateTags;
  
  
  function redirectToTags() {
    window.location.replace("tags.html");
  }
  function redirectToNav() {
    window.location.replace("Index.html");
  }*/
