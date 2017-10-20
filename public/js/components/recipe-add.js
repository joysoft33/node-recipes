'use strict';

angular.module('recipesApp')

  .component('recipeAdd', {

    templateUrl: 'js/components/recipe-add.html',

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

      this.validate = () => {
        RecipesService.addRecipe(this.recipe).then((recipe) => {
          $rootScope.$broadcast('RECIPE.NEW', recipe);
          this.addMode = false;
        }).catch((error) => {
          this.error = error;
        });
      };
    }
  });