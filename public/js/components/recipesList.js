'use strict';

angular.module('recipesApp')

  .component('recipesList', {

    templateUrl: 'js/components/recipesList.html',

    bindings: {
      categories: '<',
      recipes: '<'
    },

    controller: function ($log) {

      this.$onInit = () => {
        $log.info(`recipesList component init, ${this.recipes.length} recipes, ${this.categories.length} categories`);
      };
    }
  });