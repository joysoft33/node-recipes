'use strict';

angular.module('recipesApp')

  .component('recipesList', {

    templateUrl: 'js/components/recipesList.html',

    require: {
      parent: '^main'
    },

    bindings: {
      categories: '<',
      recipes: '<'
    },

    controller: function ($log) {

      this.$onInit = () => {
        $log.info('recipesList component init');
      };
    }
  });