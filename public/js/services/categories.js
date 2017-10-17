'use strict';

angular.module('recipesApp')

  .service('CategoriesService', function ($q, $http) {

    const URL = '/categories';
    
    this.getCategories = () => {
      var defer = $q.defer();

      $http.get(URL).then(response => {
        defer.resolve(response.data);
      }).catch(response => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };
  });