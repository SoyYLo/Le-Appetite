// Get the modal
var modal = document.getElementById("subscribeModal");

// Get the button that opens the modal
var btn = document.getElementById("subscribeBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Collect email input
const emailInput = document.getElementById("email");

const submitBttn = document.getElementById("submitBttn");


//Added an event listener to each diet link. When link is clicked, it will store the diet type in the local storage
document.addEventListener('DOMContentLoaded', function () {
  var dietLinks = document.querySelectorAll('.specialDiet');
  dietLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      localStorage.setItem('selectedDiet', this.getAttribute('data-diet'));
    });
  });
});


// add event listener 
submitBttn.addEventListener('click', function (event) {
  event.preventDefault();
  //create an object to store email input
  const emailData = {
    email: emailInput.value.trim()
  };

  // save email input to local storage
  localStorage.setItem('emailData', JSON.stringify(emailData));
  console.log(emailData);
});

//Display "thank you or email submitted message after user subscribes to email"
//this is not working

document.addEventListener("click", function () {
  const subText = document.getElementById("subText");
  this.textContent = "Thank you for subscribing!";
});



// Get random recipe with picture. Recipe of the week
window.onload = function () {
  const apiKey = '9cf1247e26ee4697922a9bce251e5de5';
  const recipeId = '12345'; //placeholder
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;


  const img = document.getElementById('randomPic');
  img.src = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

  //fetch from recipe API
  fetch(apiUrl)
    .then(response => response.json())
      .then(data => {
        //Select random recipe from list
        const recipe = data;

        console.log(recipe);
        // Display the random recipes on the page
        //displayRecipes(recipe);
      })
      .catch(error => 
        console.error("Error fetching  data:", error));
    }
