
/**
 * Things to do when document is ready
 */
document.addEventListener('DOMContentLoaded', function () {
  getAllCategories().then(categories => {
    fillCategories(categories);
  }).catch(err => {
    alert(err);
  });
});

/**
 * Request categories list
 */
function getAllCategories() {
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
    xhr.open('GET', '/categories');
    xhr.send();
  });
}

/**
 * Fill the categories dropdown list with the categories received from the server
 * @param {object array} categories 
 */
function fillCategories(categories) {

  let select = document.getElementById('categories');

  for (let category of categories) {

    let option = document.createElement('option');

    option.text = category.name;
    option.value = category.id;

    select.appendChild(option);
  }
}