'use strict';

angular.module('recipesApp')

  .component('recipeAdd', {

    templateUrl: 'js/components/recipeAdd.html',

    controller: function (RecipesService, CategoriesService, $scope, $rootScope) {

      this.$onInit = () => {

        CategoriesService.getCategories().then((categories) => {
          this.categories = categories;
        }).catch((error) => {
          this.error = error;
        });

        $scope.$on('RECIPE.ADD', (msg) => {
          this.recipe = {};
          this.addMode = true;
        });
      };

      this.cancel = () => {
        this.addMode = false;
      };

      this.validate = (file) => {
        RecipesService.addImage(file, (progress) => {
          this.progress = progress;
        }).then((result) => {
          this.recipe.image = result.url;
          return RecipesService.addRecipe(this.recipe);
        }).then((newRecipe) => {
          $rootScope.$broadcast('RECIPE.NEW', newRecipe);
          this.addMode = false;
        }).catch((error) => {
          this.error = error;
        });
      };
    }
  });