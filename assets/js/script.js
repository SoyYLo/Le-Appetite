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


const apiKey = "9cf1247e26ee4697922a9bce251e5de5";
const randomRecipeUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

//get random recipe
fetch(randomRecipeUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.json();
  })
  .then(data => {
    const recipeId = data.recipes[0].id;
    const recipeInfoUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    //get info for specific recipe
    fetch(recipeInfoUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        return response.json();
      })
      .then(recipedata => {
        console.log(recipedata);
        //Update HTML elements with recipe info
        document.getElementById('recipe-title').textContent = recipedata.title;
        document.getElementById('recipe-instructions').textContent = recipedata.instructions;
        document.getElementById('recipe-image').src = recipedata.image;
      })
      .catch(error => {
        console.error('Error fetching recipe info', error);
      });
  })
  .catch(error => {
    console.error('Error fetching random info', error);

  });



