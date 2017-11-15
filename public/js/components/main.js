'use strict';

angular.module('recipesApp')

  .component('main', {

    templateUrl: 'js/components/main.html',

    bindings: {
      loggedUser: '<'
    },

    controller: function (AuthService, CONSTANTS, $log, $state, $scope) {

      this.$onInit = () => {

        $log.info('main component init');

        $scope.$on(CONSTANTS.AUTH_EVENT, (msg, user) => {
          $log.info(`main auth: ${user}`);
          this.loggedUser = user;
        });
      };

      this.isLogged = () => this.loggedUser !== null;
      this.isAdmin = () => this.loggedUser && this.loggedUser.isAdmin;
      this.userName = () => this.loggedUser ? this.loggedUser.name : '';

      this.logout = () => {
        AuthService.logout().then(() => {
          $state.go('main.recipes');
        }).catch(() => {
          $log.debug('Not logged');
        });
      };
    }

  });