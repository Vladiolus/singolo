// script for Singolo
const HTML = document.documentElement;

// Header //

let activeNav = {active: 0};
let activeTag = {active: 0};
let activeArt = {active: 0};

function activate(a, activeElem) {
  if (activeElem.active) {
    activeElem.active.classList.remove("active");
  }
  activeElem.active = a;
  activeElem.active.classList.add("active");
}

function autoActivate() {
  let elList = document.querySelectorAll("section");
  let index;
  for (let i = 0; i < elList.length; i++) {
    if (elList[i].offsetTop - 96 < HTML.scrollTop && HTML.scrollTop < elList[i].offsetTop - 96 + elList[i].offsetHeight) {
      index = i;
    }
  }
  if (HTML.scrollTop + HTML.clientHeight == HTML.scrollHeight) index = elList.length - 1;
  activate(document.querySelectorAll("#nav a")[index], activeNav);
}

document.addEventListener("DOMContentLoaded", autoActivate);
window.addEventListener("scroll", autoActivate);

// Slider //
                        
let slideContainer = document.querySelector(".slide-container");
let slide = [];
slide[0] = document.querySelector(".slide1").outerHTML;
slide[1] = document.querySelector(".slide2").outerHTML;
let slide_toggle = 0;
let slideBlocked = false;

document.querySelector(".left").addEventListener("click", toLeft);
document.querySelector(".right").addEventListener("click", toRight);

function toLeft() {
  if (slideBlocked) return;
  slideBlocked = !slideBlocked;
  slideContainer.style.transition = "1s";
  slideContainer.style.transform = "translate(0%, 0)";
  let bgColor     = (slide_toggle == 0) ? "#648bf0" : "#f06c64";
  let borderColor = (slide_toggle == 0) ? "#5d76f6" : "#ea676b";
  document.querySelector(".grid-item-slider").style.backgroundColor = bgColor;
  document.querySelector(".grid-item-border2").style.backgroundColor = borderColor;
  setTimeout(() => {
    slideContainer.lastElementChild.remove();
    slideContainer.insertAdjacentHTML("afterbegin", slide[slide_toggle]);
    slideContainer.style.transition = "0s";
    slideContainer.style.transform = "translate(-100%, 0)";
    slide_toggle = (slide_toggle == 0) ? 1 : 0;
    slideBlocked = !slideBlocked;
  }, 1000);
}

function toRight() {
  if (slideBlocked) return;
  slideBlocked = !slideBlocked;
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

// Slider screens //

document.querySelector(".slide-container").addEventListener("click", function(event) {
  let phonePower = event.target.closest(".phone-power");
  if (!phonePower) return;
  let phoneScreen = phonePower.parentElement.querySelector(".blackscreen");
  
  if (phoneScreen.classList.contains("turnedoff")) {
    phoneScreen.classList.remove("turnedoff")
  } else {
    phoneScreen.classList.add("turnedoff")
  };
});

// Portfolio //

function sortPortfolio(tag) {
  let gallery = document.querySelector(".gallery-container");
  let arts = gallery.children;
  let first = arts[0];
  for (let i = 0; i < arts.length; i++) {
    if (arts[i].classList.contains(tag)) {
      arts[i].style.opacity = "1";
      first.before(arts[i]);
    } else {
      arts[i].style.opacity = "0.1";
    }    
  }
}

document.querySelector(".button-sort-container").addEventListener("click", function(event) {
  let tag = event.target.closest(".button-sort-item");
  if (!tag) return;
  if (!document.querySelector(".button-sort-container").contains(tag)) return;
  
  if (tag.classList.contains("button-sort-all")) sortPortfolio("tag-all");
  if (tag.classList.contains("button-sort-web")) sortPortfolio("tag-web");
  if (tag.classList.contains("button-sort-graphic")) sortPortfolio("tag-graphic");
  if (tag.classList.contains("button-sort-artwork")) sortPortfolio("tag-artwork");
  activate(tag, activeTag);
});

document.querySelector(".gallery-container").addEventListener("click", function(event) {
  let art = event.target.closest(".gallery-container > div");
  if (!art) return;
  if (!document.querySelector(".gallery-container").contains(art)) return;
  
  activate(art, activeArt);
});

// Form //

document.querySelector(".form-item[name='submit']").addEventListener("click", function(event) {
  let name = document.querySelector(".form-item[name='name']");
  let email = document.querySelector(".form-item[name='email']");
  if (name.validity.valid && email.validity.valid) {
    event.preventDefault();
    
    let subjectText = document.querySelector(".form-item[name='subject']").value;
    if (!subjectText) {
      subjectText = "No subject";
    } else {
      subjectText = "Subject: " + subjectText;
    }
    
    let commentText = document.querySelector(".form-item[name='comment']").value;    
    if (!commentText) {
      commentText = "No description";
    } else {
      commentText = "Description: " + commentText;
    }
    
    let submitted = document.getElementById("form-submitted");
    submitted.lastElementChild.insertAdjacentHTML("beforebegin", "<p style='margin-top: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'></p>");
    submitted.lastElementChild.insertAdjacentHTML("beforebegin", "<p style='max-height: 200px; margin-top: 10px; overflow: auto;'></p>");
    submitted.children[1].textContent = subjectText;
    submitted.children[2].textContent = commentText;
    submitted.style.display = "block";
  }
});

document.querySelector(".form-submitted-ok").addEventListener("click", function() {
  let form = document.querySelector(".form-container");
  for (let i = 0; i < form.length - 1; i++) {
    form.children[i].value = "";
  }
  
  let submitted = document.querySelector(".form-submitted");
  submitted.style.display = "none";
  submitted.children[1].remove;
  submitted.children[2].remove;  
});