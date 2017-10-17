'use strict';

angular.module('recipesApp')

  .component('navbar', {

    templateUrl: '/js/components/navbar.html',

    controller: function ($rootScope) {

      this.newRecipe = () => {
        $rootScope.$broadcast('RECIPE.ADD');
      };
    }
  });