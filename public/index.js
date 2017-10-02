document.addEventListener('DOMContentLoaded', function () {
  getAllRecipes();
});

function getAllRecipes() {

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          fillRecipesTable(JSON.parse(xhr.responseText));
        } catch (e) {
          console.log('ERROR:', e);
        }
      }
    }
  };

  xhr.open('GET', '/recipes');
  xhr.send();
}

function getRecipe(id) {

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          fillRecipeDetails(JSON.parse(xhr.responseText));
        } catch (e) {
          console.log('ERROR:', e);
        }
      }
    }
  };

  xhr.open('GET', `/recipes/${id}`);
  xhr.send();
}

function addRecipe() {

}

/**
 * Fill the recipe table with the recipes table received from the server
 * @param {object array} recipes 
 */
function fillRecipesTable(recipes) {

  let tbody = document.getElementById('list');

  for (let i = 0; i < recipes.length; i++) {

    let tr = document.createElement('tr');

    let markup = `<td class="image"><img src='${recipes[i].image}' alt='image'></td>`;
    markup += `<td class="title">${recipes[i].title}</td>`;

    tr.innerHTML = markup;
    tr.id = recipes[i].id;

    tr.onclick = function (evt) {
      getRecipe(evt.currentTarget.id);
    };

    tbody.appendChild(tr);
  }
}

/**
 * Fill the recipe pane the the recipe details received from the server
 * @param {object} recipe 
 */
function fillRecipeDetails(recipe) {
  for (let key in recipe) {
    let item = document.getElementById(`recipe.${key}`);
    if (item) {
      item.textContent = recipe[key];
    }
  }
}
