'use strict';

angular.module('recipesApp')

  .component('recipesList', {

    templateUrl: '/js/components/recipes-list.html',

    controller: function (RecipesService, $scope, $rootScope) {

      this.$onInit = () => {

        RecipesService.getRecipes().then(recipes => {
          this.recipes = recipes;
        }).catch(error => {
          this.error = error;
        });

        $scope.$on('RECIPE.NEW', (msg, recipe) => {
          this.recipes.push(recipe);
        });

        $scope.$on('RECIPE.DELETE', (msg, id) => {
          this.recipes = this.recipes.filter(recipe => recipe.id != id);
        });
      };

      this.displayDetails = (id) => {
        $rootScope.$broadcast('RECIPE.DETAILS', id);
      };
    }
  });