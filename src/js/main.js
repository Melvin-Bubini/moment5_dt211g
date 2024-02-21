"use strict"

//elements 

let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

// eventlistner
openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    let style = window.getComputedStyle(navMenuEl);

    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    this.classList.add('success');
  });