//baseurl to search byname

const baseURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// func to fetch meals-api data
function fetchMeals(searchTerm) {
  return fetch(baseURL + searchTerm)
    .then((response) => response.json())
    .then((data) => data.meals);
}

//url for search by id
const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

// func to search by id
function fetchById(id) {
  return fetch(url + id)
    .then((res) => res.json())
    .then((data) => data.meals);
}

//array to favorite meals
const favoriteMeals = [];

//func for adding and removing from favoriteMeals array
function toggleFavorite(meal) {
  const favoriteIndex = favoriteMeals.findIndex(
    (favorite) => favorite.idMeal === meal.idMeal
  );
  if (favoriteIndex > -1) {
    favoriteMeals.splice(favoriteIndex, 1);
  } else {
    favoriteMeals.push(meal);
  }
}

//func for displaying list of favorite meals
function displayFavorites() {
  const favoriteList = document.getElementById("favoriteList");
  favoriteList.innerHTML = "";

  // const badge=document.getElementsByClassName("badge");
  // badge[0].textContent=favoriteMeals.length>0 ? favoriteMeals.length:0;

  if (favoriteMeals.length > 0) {
    favoriteMeals.forEach((meal) => {
      const favoriteItem = document.createElement("li");
      favoriteItem.textContent = meal.strMeal;

      const btn = document.createElement("button");
      btn.innerText = "Remove";
      btn.classList.add(..."fav-btn btn ml-4".split(' '));
      btn.dataset.mealId = meal.idMeal;

      favoriteItem.appendChild(btn);

      favoriteList.appendChild(favoriteItem);
    });
  } else {
    const noFavorites = document.createElement("p");
    noFavorites.textContent = "No favorite meals yet.";
    favoriteList.appendChild(noFavorites);
  }
}

// func to display meals for search results
function displayMeals(meals) {
  const mealContainer = document.getElementById("mealContainer");
  mealContainer.innerHTML = "";

  if (meals) {
    meals.forEach((meal) => {
      const mealCard = document.createElement("div");
      mealCard.classList.add(..."card mb-3".split(" "));

      const mealImage = document.createElement("img");
      mealImage.classList.add("img-thumbnail",'float-left');
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealCard.appendChild(mealImage);

      const mealCardBody = document.createElement("div");
      mealCardBody.classList.add("card-body");
      mealCard.appendChild(mealCardBody);

      const btn = document.createElement("button");
      btn.innerText = "Add to favourite";
      btn.classList.add(..."fav-btn btn btn-secondary".split(" "));
      btn.dataset.mealId = meal.idMeal;

      mealCardBody.appendChild(btn);

      const mealTitle = document.createElement("h5");
      mealTitle.classList.add("card-title");
      mealTitle.textContent = meal.strMeal;
      mealCardBody.appendChild(mealTitle);

      const mealInstructions = document.createElement("p");
      mealInstructions.classList.add("card-text");
      mealInstructions.textContent = meal.strInstructions;
      mealCardBody.appendChild(mealInstructions);

      mealContainer.appendChild(mealCard);
    });
  } else {
    const noResults = document.createElement("p");
    noResults.textContent = "No meals found.";
    mealContainer.appendChild(noResults);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  console.log(searchInput);

  // const badge=document.getElementsByClassName("badge");
  // badge[0].textContent=favoriteMeals.length>0 ? favoriteMeals.length:0;
  

  displayFavorites();

  

  searchInput.addEventListener("change", () => {
    const searchTerm = searchInput.value.trim();
    console.log(searchTerm);
    if (searchTerm !== "") {
      fetchMeals(searchTerm).then((meals) => {
        console.log(meals);
        displayMeals(meals);
        displayFavorites();
      });
    } else {
      displayMeals([]);
      displayFavorites();
    }
  });
  document.addEventListener("click", (event) => {
    const target = event.target;
    
    if (target.classList.contains("fav-btn")) {
      const mealId = target.dataset.mealId;

      fetchById(mealId).then((meals) => {
        
        
        if (meals) {
          toggleFavorite(meals[0]);
          displayFavorites();
        }
      });
    }
  });
});
