
/**
 * Things to do when document is ready
 */
document.addEventListener('DOMContentLoaded', function () {
  getAllRecipes().then(recipes => {
    fillRecipesTable(recipes);    
  }).catch(err => {
    alert(err);
  });
});

/**
 * Retrieve all recipes from server
 */
function getAllRecipes() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (err) {
            reject(new Error(err));
          }
        }
      }
    };
    xhr.open('GET', '/recipes');
    xhr.send();
  });
}

/**
 * Get the requested recipe from server
 * @param {*} id 
 */
function getRecipe(id) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (err) {
            reject(new Error(err));
          }
        }
      }
    };
    xhr.open('GET', `/recipes/${id}`);
    xhr.send();
  });
}

/**
 * Fill the recipe table with the recipes table received from the server
 * @param {object array} recipes 
 */
function fillRecipesTable(recipes) {

  let tbody = document.getElementById('list');

  for (let recipe of recipes) {

    let tr = document.createElement('tr');

    let markup = `<td class="image"><img src='${recipe.image}' alt='image'></td>`;
    markup += `<td class="title">${recipe.title}</td>`;

    tr.innerHTML = markup;
    tr.id = recipe.id;

    tr.onclick = function (evt) {
      getRecipe(evt.currentTarget.id).then(recp => {
        fillRecipeDetails(recp);
      }).catch(err => {
        alert(err);
      });
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
    let item = document.getElementById(`recipe_${key}`);
    if (item) {
      if (key === 'image') {
        item.src = recipe[key];        
      } else {
        item.textContent = recipe[key];
      }
    }
  }
}
