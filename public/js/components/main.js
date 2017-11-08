'use strict';

angular.module('recipesApp')

  .component('main', {

    templateUrl: 'js/components/main.html',

    bindings: {
      categories: '<'
    }
  });