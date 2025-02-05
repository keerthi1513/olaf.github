// DO NOT EDIT THIS JS FILE!

//get the popup elements:
const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("popup");
const popupCover = document.getElementById("popupCover");



// show & hide popups:
function showPopup() {
    popup.style.display = "block";
    popupCover.style.display = "block";
    openPopup.setAttribute("onClick", "hidePopup()");
    localStorage.removeItem("D3E1closed");
}

function hidePopup() {
    popup.style.display = "none";
    popupCover.style.display = "none";
    openPopup.setAttribute("onClick", "showPopup()");   
    localStorage.setItem("D3E1closed", "Y");
}

function loadPopupState() {
    if (localStorage.getItem("D3E1closed")) { hidePopup(); }
}


// SET JUSTIFY CONTENT & ALIGN ITEMS SETTINGS ON SECTION 1:
// --------------------------------------------------------
const s1 = document.getElementById("s1") // get section 1

//update justify content via radio button:
const jc = document.getElementsByName("jc"); // justify-content radio buttons
var m;
for (m=0; m < jc.length; m++) {
    jc[m].addEventListener("click", function() {
        s1.firstElementChild.nextElementSibling.firstElementChild.style.justifyContent = this.value;
        s1.firstElementChild.nextElementSibling.lastElementChild.style.justifyContent = this.value;
    });
}
//update align items via radio button:
const ai = document.getElementsByName("ai"); // align-items radio buttons
var m;
for (m=0; m < ai.length; m++) {
    ai[m].addEventListener("click", function() {
        s1.firstElementChild.nextElementSibling.firstElementChild.style.alignItems = this.value;
        s1.firstElementChild.nextElementSibling.lastElementChild.style.alignItems = this.value;
    });
}

// SET ALIGN CONTENT SETTINGS ON SECTION 2:
// --------------------------------------------------------
const s2 = document.getElementById("s2") // get section 2

//update align content via radio button:
const ac = document.getElementsByName("ac"); // align-items radio buttons
var m;
for (m=0; m < ac.length; m++) {
    ac[m].addEventListener("click", function() {
        s2.firstElementChild.nextElementSibling.firstElementChild.style.alignContent = this.value;
        s2.firstElementChild.nextElementSibling.lastElementChild.style.alignContent = this.value;
    });
}


// SET ALIGN CONTENT SETTINGS ON SECTION 3:
// --------------------------------------------------------
const s3 = document.getElementById("s3") // get section 1

//update flex-basis for Item 1 via radio button:
const fb1 = document.getElementsByName("fb1"); // 
var m;
for (m=0; m < fb1.length; m++) {
    fb1[m].addEventListener("click", function() {
        s3.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.style.flexBasis = this.value;
        s3.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.nextElementSibling.style.flexBasis = this.value;
    });
}

//update flex-grow for Item 1 via radio button:
const fg1 = document.getElementsByName("fg1"); // 
var m;
for (m=0; m < fg1.length; m++) {
    fg1[m].addEventListener("click", function() {
        s3.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.style.flexGrow = this.value;
        s3.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.nextElementSibling.style.flexGrow = this.value;
    });
}
//update flex-grow for Item 2 via radio button:
const fg2 = document.getElementsByName("fg2"); // 
var m;
for (m=0; m < fg2.length; m++) {
    fg2[m].addEventListener("click", function() {
        s3.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.flexGrow = this.value;
        s3.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.flexGrow = this.value;
    });
}
//update flex-grow for Item 3 via radio button:
const fg3 = document.getElementsByName("fg3"); // 
var m;
for (m=0; m < fg3.length; m++) {
    fg3[m].addEventListener("click", function() {
        s3.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.flexGrow = this.value;
        s3.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.flexGrow = this.value;
    });
}