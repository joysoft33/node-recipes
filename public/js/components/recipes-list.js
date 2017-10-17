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
      };

      this.displayDetails = (id) => {
        $rootScope.$broadcast('RECIPE.DETAILS', id);
      };

      this.add = () => {
        $rootScope.$broadcast('RECIPE.ADD');
      };
    }
  });