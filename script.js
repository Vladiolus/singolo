// script for Singolo
const HTML = document.documentElement;
let selectedNav;

// Header //

function activate(a) {
  if (selectedNav) {
    selectedNav.classList.remove("active");
  }
  selectedNav = a;
  selectedNav.classList.add("active");
}

// There is no need in activation on click - scroll will activate menu automatically.
/*
document.getElementById("nav").addEventListener("click", function(event) {
  let a = event.target.closest("a");
  if (!a) return;
  if (!nav.contains(a)) return;
  
  activate(a);
});
*/

window.addEventListener("scroll", function() {
  let elList = document.querySelectorAll("section");
  let index;
  for (let i = 0; i < elList.length; i++) {
    if (elList[i].offsetTop - 96 < HTML.scrollTop && HTML.scrollTop < elList[i].offsetTop - 96 + elList[i].offsetHeight) {
      index = i;
    }
  }
  if (HTML.scrollTop + HTML.clientHeight == HTML.scrollHeight) index = elList.length - 1;
  activate(document.querySelectorAll("#nav a")[index]);
});

// Old variant of scroll. A little bit too specific.

/*
let posServices = document.getElementById("services").offsetTop - 96;
let posPortfolio = document.getElementById("portfolio").offsetTop - 96;
let posAbout = document.getElementById("about").offsetTop - 96;
let posContact = document.getElementById("contact").offsetTop - 96;
let posBottom = HTML.scrollHeight;

setInterval(function() {
  if (HTML.scrollTop  < posServices)                                                      activate(document.querySelectorAll("#nav a")[0]);
  if (posServices     < HTML.scrollTop && HTML.scrollTop < posPortfolio)                  activate(document.querySelectorAll("#nav a")[1]);
  if (posPortfolio    < HTML.scrollTop && HTML.scrollTop < posAbout)                      activate(document.querySelectorAll("#nav a")[2]);
  if (posAbout        < HTML.scrollTop && HTML.scrollTop < posContact)                    activate(document.querySelectorAll("#nav a")[3]);
  if (posContact      < HTML.scrollTop || HTML.scrollTop+HTML.clientHeight == posBottom)  activate(document.querySelectorAll("#nav a")[4]);
}, 1);
*/

// Slider //
let slideContainer = document.querySelector(".slide-container");
let slide = [];
slide[0] = document.querySelector(".slide1").outerHTML;
slide[1] = document.querySelector(".slide2").outerHTML;
let slide_toggle = 0;
let slideBlocked = false;

document.querySelector(".right").addEventListener("click", toRight);

function toRight() {
  if (slideBlocked) return;
  slideBlocked = !slideBlocked;
  slideContainer.style.flexDirection = "row";
  slideContainer.style.transition = "1s";
  slideContainer.style.transform = "translate(-200%, 0)";
  let bgColor     = (slide_toggle == 0) ? "#648bf0" : "#f06c64";
  let borderColor = (slide_toggle == 0) ? "#5d76f6" : "#ea676b";
  document.querySelector(".grid-item-slider").style.backgroundColor = bgColor;
  document.querySelector(".grid-item-border2").style.backgroundColor = borderColor;
  setTimeout(() => {
    slideContainer.firstElementChild.remove();
    slideContainer.insertAdjacentHTML("beforeend", slide[slide_toggle]);
    slideContainer.style.transition = "0s";
    slideContainer.style.transform = "translate(-100%, 0)";
    slide_toggle = (slide_toggle == 0) ? 1 : 0;
    slideBlocked = !slideBlocked;
  }, 1000);
}
  //document.querySelector(".slide-container").style.transform = "translate(-100%, 0)";