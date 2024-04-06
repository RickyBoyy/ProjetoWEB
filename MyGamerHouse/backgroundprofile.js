var changeBackgroundButton = document.getElementById("changeBackgroundButton");
var changeBackgroundButtonPrev = document.getElementById("changeBackgroundButtonPrev");

var backgrounds = [
    "url('https://tse4.mm.bing.net/th?id=OIP.gH5VltaBUyLu0xE_Sd8VxAHaLH&pid=Api&P=0&h=220')",
    "url('https://tse2.mm.bing.net/th?id=OIP.hGN3RmQSNBfckbVvhZiuPAHaK-&pid=Api&P=0&h=220')",
    
    // Adicione mais URLs de imagens conforme necessário
];

var currentBackgroundIndex = 0;

changeBackgroundButton.addEventListener("click", function() {
    changeBackground(1); // Next
});

changeBackgroundButtonPrev.addEventListener("click", function() {
    changeBackground(-1); // Previous
});

window.onload = function() {
    updateBackground();
}

function changeBackground(step) {
    currentBackgroundIndex = (currentBackgroundIndex + step + backgrounds.length) % backgrounds.length;
    updateBackground();
}

function updateBackground() {
    var body = document.body;
    body.style.backgroundImage = backgrounds[currentBackgroundIndex];
    body.style.backgroundPosition = "right top";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "contain";
}
