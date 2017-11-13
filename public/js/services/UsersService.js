'use strict';

angular.module('recipesApp')

  .factory('UsersService', function ($resource, Upload) {
    return $resource('/users/:id', {
      id: '@id'
    });
  });