export default recipesService;

/**
 * The recipes service
 * @param {*} $resource
 * @param {*} $q
 * @param {*} Upload
 * @return {*}
 */
function recipesService($resource, $q, Upload) {
  'ngInject';

  const Recipe = $resource('/recipes/:id', {
    id: '@id'
  });

  Recipe.prototype.uploadImage = (file, progress) => {

    const defer = $q.defer();

    Upload.upload({
      url: '/recipes/image',
      data: {
        file: file
      }
    }).then((response) => {
      // Image uploaded
      if (response.status === 200) {
        // No error, return the image url
        defer.resolve(response.data);
      } else {
        // Error detected, return the error text
        defer.reject(response.statusText);
      }
    }, (error) => {
      // Error detected
      defer.reject(error);
    }, (evt) => {
      // Upload progression, update UI if a callback has been supplied
      if (typeof progress === 'function') {
        const progressPercentage = parseInt((100.0 * evt.loaded) / evt.total, 10);
        progress(progressPercentage);
      }
    });

    return defer.promise;
  };

  return Recipe;
}