'use strict';

angular.module('recipesApp')

  .component('recipeDetails', {

    templateUrl: '/js/components/recipe-details.html',
    
    controller: function(RecipesService, $rootScope) {

      this.$onInit = () => {
        $rootScope.$on('DETAILS', (msg, id) => {
          RecipesService.getRecipe(id).then(recipe => {
            this.recipe = recipe;
          }).catch(error => {
            this.error = error;
          });
        });  
      };
    }

  });