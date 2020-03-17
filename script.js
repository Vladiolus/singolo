// script for Singolo
let selectedNav;

nav.onclick = function(event) {
  let a = event.target.closest("a");
  if (!a) return;
  if (!nav.contains(a)) return;
  
  activate(a);
}

function activate(a) {
  if (selectedNav) {
    selectedNav.classList.remove("active");
  }
  selectedNav = a;
  selectedNav.classList.add("active");
}