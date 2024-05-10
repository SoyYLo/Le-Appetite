// Get the modal
var modal = document.getElementById("subscribeModal");

// Get the button that opens the modal
var btn = document.getElementById("subscribeBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Collect email input
const emailInput = getElementById("email");

const submitBttn = getElementById("submitBttn");

//Added an event listener to each diet link. When link is clicked, it will store the diet type in the local storage
document.addEventListener('DOMContentLoaded', function() {
  var dietLinks = document.querySelectorAll('.specialDiet');
  dietLinks.forEach(function(link) {
      link.addEventListener('click', function() {
          localStorage.setItem('selectedDiet', this.getAttribute('data-diet'));
      });
  });
});


// add event listener 

// save email input to local storage

// assign weekly emails for recipe of the week to all emails subscribed

