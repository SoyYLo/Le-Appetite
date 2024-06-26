document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    const selectedDiet = urlParams.get('diet');

    console.log("Search Query:", searchQuery);
    console.log("Selected Diet:", selectedDiet);

    if (searchQuery || selectedDiet) {
        fetchRecipes(searchQuery, selectedDiet);
    } else {
        // Handle case where there's no search query or diet parameter
        console.error("No search query or diet parameter provided.");
    }

    // Function to fetch recipe data from the API based on query and diet
    function fetchRecipes(query, diet) {
        const apiKey = "04370d6f3fe642c5824018d3e9c9b22e"; 
        let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=20`;

        if (query) {
            apiUrl += `&query=${query}`;
        }

        if (diet) {
            apiUrl += `&diet=${diet}`;
        }

        // Fetch recipe data from the API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Log the response data to the console
                console.log("Response data:", data);
                
                // Display the fetched recipes on the page
                displayRecipes(data.results);
            })
            .catch(error => {
                console.error("Error fetching recipe data:", error);
                const resultsContainer = document.getElementById("results");
                resultsContainer.innerHTML = "<p>Error fetching recipe data. Please try again later.</p>";
            });
    }

    // Function to fetch recipe information based on recipe ID
    function fetchRecipeInformation(recipeId) {
        const apiKey = "04370d6f3fe642c5824018d3e9c9b22e";
        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

        // Fetch recipe information from the API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch recipe with ID ${recipeId}`);
                }
                return response.json();
            })
            .then(data => {
                // Log the recipe data to the console
                console.log("Recipe information:", data);
                // Process the recipe information as needed
            })
            .catch(error => {
                console.error("Error fetching recipe information:", error);
            });
    }

    // Function to display recipes on the page
    function displayRecipes(recipes) {
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ""; // Clear previous results

        // Loop through fetched recipes and create HTML elements to display them
        recipes.forEach(recipe => {
            const recipeElement = document.createElement("div");
            recipeElement.classList.add("recipe");

            const nameElement = document.createElement("h2");
            const linkElement = document.createElement("a");
            linkElement.href = `https://spoonacular.com/${recipe.title}-${recipe.id}`;
            linkElement.textContent = recipe.title;
            linkElement.target = "_blank";
            nameElement.appendChild(linkElement);

            const imageElement = document.createElement("img");
            imageElement.src = recipe.image;
            imageElement.alt = recipe.title;

            const summaryElement = document.createElement("p");
            summaryElement.textContent = recipe.summary;

            // Add click event listener to fetch recipe information on click
            recipeElement.addEventListener("click", function() {
                fetchRecipeInformation(recipe.id);
            });

            recipeElement.appendChild(nameElement);
            recipeElement.appendChild(imageElement);
            recipeElement.appendChild(summaryElement);

            resultsContainer.appendChild(recipeElement);
        });
    }

    // Handle form submission to trigger the API request
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const searchQuery = document.getElementById("searchQuery").value;
        fetchRecipes(searchQuery);
    });
});

