'use strict';

angular.module('recipesApp')

  .component('recipeAdd', {

    templateUrl: 'js/components/recipeAdd.html',

    bindings: {
      categories: '<'
    },

    controller: function ($log, $state, RecipesService) {

      this.$onInit = () => {
        $log.info(`recipeAdd component init, ${this.categories.length} categories`);
      };

      this.validate = (file) => {
        let recipe = new RecipesService(this.recipe);
        recipe.uploadImage(file, (progress) => {
          this.progress = progress;
        }).then((result) => {
          recipe.image = result.url;
          return recipe.$save();
        }).then((newRecipe) => {
          $state.go('list');
        }).catch((error) => {
          this.error = error;
        });
      };
    }
  });