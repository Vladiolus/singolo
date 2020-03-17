// script for Singolo
let html = document.documentElement;
let selectedNav;
let posServices = document.getElementById("services").offsetTop - 96;
let posPortfolio = document.getElementById("portfolio").offsetTop - 96;
let posAbout = document.getElementById("about").offsetTop - 96;
let posContact = document.getElementById("contact").offsetTop - 96;
let posBottom = document.body.scrollHeight;

nav.addEventListener("click", function(event) {
  let a = event.target.closest("a");
  if (!a) return;
  if (!nav.contains(a)) return;
  
  activate(a);
});

function activate(a) {
  if (selectedNav) {
    selectedNav.classList.remove("active");
  }
  selectedNav = a;
  selectedNav.classList.add("active");
}

window.addEventListener("scroll", function() {
  if (html.scrollTop < posServices) activate(document.querySelectorAll("nav a")[0]);
  if (posServices < html.scrollTop && html.scrollTop < posPortfolio) activate(document.querySelectorAll("nav a")[1]);
  if (posPortfolio < html.scrollTop && html.scrollTop < posAbout) activate(document.querySelectorAll("nav a")[2]);
  if (posAbout < html.scrollTop && html.scrollTop < posContact) activate(document.querySelectorAll("nav a")[3]);
  if (posContact < html.scrollTop || html.scrollTop+html.clientHeight == posBottom) activate(document.querySelectorAll("nav a")[4]);
});