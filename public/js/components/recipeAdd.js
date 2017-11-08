'use strict';

angular.module('recipesApp')

  .component('recipeAdd', {

    templateUrl: 'js/components/recipeAdd.html',

    bindings: {
      categories: '<'
    },

    controller: function ($log, $state, RecipesService) {

      this.$onInit = () => {
        $log.info(`recipeAdd component init, ${this.categories ? this.categories.length : 0} categories`);
        this.recipe = new RecipesService();
        this.maxFileSize = 2;
      };

      this.validate = (file) => {
        this.recipe.uploadImage(file, (progress) => {
          this.progress = progress;
        }).then((result) => {
          this.recipe.image = result.url;
          return this.recipe.$save();
        }).then((newRecipe) => {
          $state.go('main.list');
        }).catch((error) => {
          this.error = error;
        });
      };
    }
  });