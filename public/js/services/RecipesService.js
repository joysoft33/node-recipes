'use strict';

angular.module('recipesApp')

  .service('RecipesService', function (Upload, $q, $http, $httpParamSerializer) {

    const URL = '/recipes';

    this.getRecipes = () => {

      let defer = $q.defer();

      $http.get(URL).then((response) => {
        defer.resolve(response.data);
      }).catch((response) => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };

    this.getRecipe = (id) => {

      let defer = $q.defer();

      $http.get(`${URL}/${id}`).then((response) => {
        defer.resolve(response.data);
      }).catch((response) => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };

    this.addImage = (file, progress) => {

      let defer = $q.defer();

      Upload.upload({
        url: URL + '/image',
        data: {
          file: file
        }
      }).then((response) => {
        // Image uploaded
        if (response.status === 200) {
          // No error, return the image url
          defer.resolve(response.data);
        } else {
          // Error detected
          defer.reject(response.statusText);
        }
      }, (error) => {
        // Error detected
        defer.reject(error);
      }, (evt) => {
        // Upload progression
        if (typeof progress === 'function') {
          let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          progress(progressPercentage);
        }
      });

      return defer.promise;
    };

    this.addRecipe = (recipe) => {

      let defer = $q.defer();

      $http.post(URL, recipe).then((response) => {
        defer.resolve(response.data);
      }).catch((response) => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };

    this.deleteRecipe = (id) => {

      let defer = $q.defer();

      $http.delete(`${URL}/${id}`).then((response) => {
        defer.resolve(response.data);
      }).catch((response) => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };
  });