'use strict';

angular.module('recipesApp')

  .factory('CategoriesService', function ($resource, Upload) {
    return $resource('/categories/:id', {
      id: '@id'
    });
  });