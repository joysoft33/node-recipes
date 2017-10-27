'use strict';

angular.module('recipesApp')

  .component('recipesList', {

    templateUrl: 'js/components/recipesList.html',

    bindings: {
      recipes: '<'
    },

    controller: function ($log, $state) {

      this.$onInit = () => {
        $log.info('recipesList component init');
      };

      this.displayDetails = (id) => {
        $state.go('details', {
          id: id
        });
      };
    }
  });