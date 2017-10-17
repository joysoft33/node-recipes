const URL = '/recipes';

angular.module('recipesApp')

  .service('RecipesService', function ($q, $http) {

    this.getRecipes = () => {
      var defer = $q.defer();

      $http.get(URL).then(response => {
        defer.resolve(response.data);
      }).catch(response => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };

    this.getRecipe = (id) => {
      var defer = $q.defer();

      $http.get(`${URL}/${id}`).then(response => {
        defer.resolve(response.data);
      }).catch(response => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };

    this.addRecipe = (recipe) => {
      var defer = $q.defer();

      $http.post(URL, recipe).then(response => {
        defer.resolve(response.data);
      }).catch(response => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };

    this.deleteRecipe = (id) => {
      var defer = $q.defer();

      $http.delete(`${URL}/${id}`).then(response => {
        defer.resolve(response.data);
      }).catch(response => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };
  });