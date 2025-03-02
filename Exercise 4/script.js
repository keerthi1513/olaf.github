function toggleDiv1() {
    let div1 = document.getElementById("div1");
    div1.classList.toggle("hidden");
}

document.getElementById("button2").addEventListener("click", function () {
    let div2 = document.getElementById("div2");
    div2.classList.toggle("hidden");
});