document.querySelector("#home-button").addEventListener("click", function(){
    location.href = "landing-page.html";
});

document.querySelector("#about-us-button").addEventListener("click", function(){
    location.href = "about-us.html";
});

document.querySelector("#blog-button").addEventListener("click", function(){
    location.href = "blog.html";
});

document.querySelector("#data-dashboard-button").addEventListener("click", function(){
    location.href = "data-dashboard.html";
});

document.querySelector("#social-media-button").addEventListener("click", function(){
    location.href = "social-media.html";
});

document.querySelector("#sponsors-button").addEventListener("click", function(){
    location.href = "sponsors.html";
});

var toggle_btn;
var big_wrapper;
var hamburger_menu;

function declare() {
  toggle_btn = document.querySelector(".toggle-btn");
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

let dark = false;

function toggleAnimation() {

  dark = !dark;
  let clone = big_wrapper;
  if (dark) {
    clone.classList.remove("light");
    clone.classList.add("dark");
  } else {
    clone.classList.remove("dark");
    clone.classList.add("light");
  }
}

function events() {
  toggle_btn.addEventListener("click", toggleAnimation);
  hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();


