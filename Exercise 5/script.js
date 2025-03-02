document.getElementById("textInput").addEventListener("input", function() {
    document.getElementById("styledBox").textContent = this.value || "Dynamic Box";
});

document.getElementById("borderInput").addEventListener("input", function() {
    document.getElementById("styledBox").style.borderWidth = this.value + "px";
});

document.getElementById("widthSlider").addEventListener("input", function() {
    document.getElementById("styledBox").style.width = this.value + "px";
});

document.getElementById("fontSelect").addEventListener("change", function() {
    document.getElementById("styledBox").style.fontFamily = this.value;

    // Apply gradient only if no solid color was selected
    if (!document.getElementById("styledBox").dataset.solidColor) {
        document.getElementById("styledBox").style.background = getRandomGradient();
    }
});

document.getElementById("bgColorPicker").addEventListener("input", function() {
    let box = document.getElementById("styledBox");

    // Clear any previous background gradient before applying solid color
    box.style.background = "none";  
    box.style.backgroundColor = this.value;

    // Mark that a solid color has been applied
    box.dataset.solidColor = "true";  
});

function getRandomGradient() {
    const colors = [
        ["#ff9a9e", "#fad0c4"],
        ["#a18cd1", "#fbc2eb"],
        ["#ffdde1", "#ee9ca7"],
        ["#74ebd5", "#ACB6E5"],
        ["#f8b195", "#f67280"],
    ];
    let randomIndex = Math.floor(Math.random() * colors.length);
    return `linear-gradient(135deg, ${colors[randomIndex][0]}, ${colors[randomIndex][1]})`;
}
