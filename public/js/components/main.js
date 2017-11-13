'use strict';

angular.module('recipesApp')

  .component('main', {

    templateUrl: 'js/components/main.html',

    bindings: {
      loggedUser: '<',
      categories: '<'
    },

    controller: function (CONSTANTS, $log, $scope) {

      this.$onInit = () => {

        $log.info(`main component init, ${this.categories.length} categories`);

        $scope.$on(CONSTANTS.AUTH_EVENT, (msg, user) => {
          $log.info(`main auth: ${user}`);
          this.loggedUser = user;
        });
      };
    }

  });