'use strict';

angular.module('recipesApp')

  .component('recipeDetails', {

    templateUrl: 'js/components/recipeDetails.html',

    controller: function (RecipesService, $scope, $rootScope) {

      this.$onInit = () => {
        $scope.$on('RECIPE.DETAILS', (msg, id) => {
          RecipesService.getRecipe(id).then((recipe) => {
            this.recipe = recipe;
          }).catch((error) => {
            this.error = error;
          });
        });
      };

      this.delete = (id) => {
        RecipesService.deleteRecipe(id).then(() => {
          $rootScope.$broadcast('RECIPE.DELETE', id);
          this.recipe = undefined;
        }).catch((error) => {
          this.error = error;
        });
      };
    }

  });