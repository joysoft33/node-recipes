'use strict';

angular.module('recipesApp')

  .component('recipeDetails', {

    templateUrl: 'js/components/recipeDetails.html',

    require: {
      parent: '^main'
    },

    bindings: {
      recipe: '<'
    },

    controller: function ($log, $state) {

      this.$onInit = () => {
        $log.info('recipeDetails component init');
      };

      this.delete = () => {
        this.recipe.$delete(() => {
          $state.go('main.list');
        }, (error) => {
          this.error = error.statusText;
        });
      };
    }

  });