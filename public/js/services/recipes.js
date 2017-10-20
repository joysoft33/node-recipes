'use strict';

angular.module('recipesApp')

  .service('RecipesService', function ($q, $http) {

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