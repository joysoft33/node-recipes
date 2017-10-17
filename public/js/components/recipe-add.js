'use strict';

angular.module('recipesApp')

  .component('recipeAdd', {

    templateUrl: '/js/components/recipe-add.html',

    controller: function (RecipesService, $scope, $rootScope) {

      this.$onInit = () => {
        $scope.$on('RECIPE.ADD', (msg) => {
          this.addMode = true;
        });  
      };

      this.cancel = () => {
        this.addMode = false;
      };

      this.validate = () => {
        RecipesService.addRecipe(this.recipe).then(recipe => {
          $rootScope.$broadcast('RECIPE.NEW', recipe);
          this.addMode = false;
        }).catch(error => {
          this.error = error;
        });
      };
    }
  });