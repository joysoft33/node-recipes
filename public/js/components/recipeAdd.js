'use strict';

angular.module('recipesApp')

  .component('recipeAdd', {

    templateUrl: 'js/components/recipeAdd.html',

    bindings: {
      categories: '<'
    },

    controller: function ($log, $state, RecipesService) {

      this.$onInit = () => {
        $log.info('recipeAdd component init');
      };

      this.validate = (file) => {
        RecipesService.addImage(file, (progress) => {
          this.progress = progress;
        }).then((result) => {
          this.recipe.image = result.url;
          return RecipesService.addRecipe(this.recipe);
        }).then((newRecipe) => {
          $state.go('list');
        }).catch((error) => {
          this.error = error;
        });
      };
    }
  });