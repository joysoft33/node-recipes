'use strict';

angular.module('recipesApp')

  .component('navbar', {

    templateUrl: 'js/components/navbar.html',

    controller: function (AuthService, $scope, $log, $state, $translate) {

      this.$onInit = () => {

        $scope.$on('AUTH', (msg, user) => {
          this.loggedUser = user;
        });

        AuthService.getCurrent().then((user) => {
          this.loggedUser = user;
          $log.debug('Logged');
        }).catch(() => {
          $log.debug('Not logged');
        });
        this.lang = $translate.use();
      };

      this.setLanguage = (code) => {
        $translate.use(code);
        this.lang = $translate.use();
      };

      this.logout = () => {
        AuthService.logout().then(() => {
          this.loggedUser = undefined;
          $state.go('main.list');
        }).catch(() => {
          $log.debug('Not logged');
        });
      };
    }
  });