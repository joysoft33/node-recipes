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

  });