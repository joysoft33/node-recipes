'use strict';

angular.module('recipesApp')

  .component('recipeDetails', {

    templateUrl: 'js/components/recipeDetails.html',

    bindings: {
      recipe: '<'
    },

    controller: function ($log, $state, RecipesService) {

      this.$onInit = () => {
        $log.info('recipeDetails component init');
      };

      this.delete = () => {
        RecipesService.delete({
          id: this.recipe.id
        }).$promise.then(() => {
          $state.go('list');
        }).catch((error) => {
          this.error = error;
        });
      };
    }

  });