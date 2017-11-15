'use strict';

angular.module('recipesApp')

  .run(function (CheckRouteService) {
    CheckRouteService.initialize();
  });