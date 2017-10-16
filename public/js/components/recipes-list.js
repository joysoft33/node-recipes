'use strict';

angular.module('recipesApp')

  .component('recipesList', {

    templateUrl: '/js/components/recipes-list.html',

    controller: function (RecipesService, $rootScope) {

      this.$onInit = () => {
        RecipesService.getRecipes().then(recipes => {
          this.recipes = recipes;
        }).catch(error => {
          this.error = error;
        });
      };

      this.displayDetails = (id) => {
        $rootScope.$emit('DETAILS', id);
      };
    }
  });