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

toggle_btn.addEventListener("click", function(){
  toggleAnimation();
});

function toggleAnimation() {
  dark = !dark;

  if (dark) {
    big_wrapper.classList.remove("light");
    big_wrapper.classList.add("dark");
  } else {
    big_wrapper.classList.remove("dark");
    big_wrapper.classList.add("light");
  }
}

document.querySelector("#home-button").addEventListener("click", function(){
  location.href = "index.html";
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

const header = document.querySelector("header");

header.addEventListener("click", (event) => {
  if (event.target.closest("#home-button")) {
    location.href = "index.html";
  } else if (event.target.closest("#about-us-button")) {
    location.href = "about-us.html";
  } else if (event.target.closest("#blog-button")) {
    location.href = "blog.html";
  } else if (event.target.closest("#data-dashboard-button")) {
    location.href = "data-dashboard.html";
  } else if (event.target.closest("#social-media-button")) {
    location.href = "social-media.html";
  } else if (event.target.closest("#sponsors-button")) {
    location.href = "sponsors.html";
  }
});

function events() {
  hamburger_menu.addEventListener("click", () => {
  big_wrapper.classList.toggle("active");
  });
}

declare();
events();
