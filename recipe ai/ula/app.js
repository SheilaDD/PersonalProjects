let ingredients = [];

const API_KEY = "dd7441abfde64fda8e3d9e1ad68d4691";

// Search Recipe button (fetches recipes)
document.getElementById("add-ingredient").addEventListener("click", () => {
  if (ingredients.length === 0) {
    document.getElementById("error-message").innerText =
      "Please add at least one ingredient.";
    return;
  }
  document.getElementById("error-message").innerText = "";
  fetchRecipes(ingredients);
});

// Add Ingredient button (adds to list)
document.getElementById("search-button").addEventListener("click", () => {
  const input = document.getElementById("search-input").value.trim();
  if (input) {
    ingredients.push(input);
    updateIngredients();
    document.getElementById("search-input").value = ""; // Clear the search bar
  }
});

// Clear button
document.getElementById("clear-button").addEventListener("click", () => {
  document.getElementById("search-input").value = "";
  ingredients = [];
  updateIngredients();
  document.getElementById("recipe-grid").innerHTML = "";
});

async function fetchRecipes(ingredients) {
  if (!ingredients.length) return;
  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
      ","
    )}&number=5&apiKey=${API_KEY}`
  );
  const data = await response.json();
  displayRecipes(data);
}

function displayRecipes(data) {
  const grid = document.getElementById("recipe-grid");
  grid.innerHTML = "";
  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `<h3>${recipe.title}</h3><img src="${recipe.image}" width="100" />`;
    card.addEventListener("click", () => openRecipeModal(recipe));
    grid.appendChild(card);
  });
}

async function openRecipeModal(recipe) {
  const modal = document.getElementById("recipe-modal");
  const details = document.getElementById("modal-recipe-details");
}

// Close modal on close button click
document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("recipe-modal").style.display = "none";
});

// Optional: Close modal when clicking outside modal-content
document.getElementById("recipe-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.style.display = "none";
  }
});

// In your openRecipeModal function, add the Save button dynamically:
async function openRecipeModal(recipe) {
  const modal = document.getElementById("recipe-modal");
  const details = document.getElementById("modal-recipe-details");

  // Fetch full recipe information
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
  );
  const data = await response.json();

  // Build ingredients list HTML
  const ingredientsList = data.extendedIngredients
    .map((ing) => `<li>${ing.original}</li>`)
    .join("");

  details.innerHTML = `
    <h2>${data.title}</h2>
    <img src="${data.image}" style="max-width:100%;border-radius:8px;" />
    <h3>Ingredients</h3>
    <ul>${ingredientsList}</ul>
    <h3>Instructions</h3>
    <div>${data.instructions || "No instructions available."}</div>
    <button id="save-recipe-btn" class="save-btn">Save Recipe</button>
  `;
  modal.style.display = "flex";

  // Save button logic
  document.getElementById("save-recipe-btn").onclick = function () {
    saveRecipe(data);
    this.innerText = "Saved!";
    this.disabled = true;
  };
}

function saveRecipe(recipe) {
  let saved = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
  // Avoid duplicates
  if (!saved.some((r) => r.id === recipe.id)) {
    saved.push({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
    });
    localStorage.setItem("savedRecipes", JSON.stringify(saved));
  }
}
function updateIngredients() {
  const list = document.getElementById("ingredient-list");
  list.innerHTML = "";
  ingredients.forEach((item, index) => {
    const el = document.createElement("div");
    el.innerHTML = `${item} <button onclick="removeIngredient(${index})">x</button>`;
    list.appendChild(el);
  });
  document.getElementById("ingredient-count").innerText = ingredients.length;
}

function removeIngredient(index) {
  ingredients.splice(index, 1);
  updateIngredients();
}

// Initial setup
updateIngredients();
