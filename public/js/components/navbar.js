'use strict';

angular.module('recipesApp')

  .component('navbar', {

    templateUrl: 'js/components/navbar.html',

    require: {
      parent: '^main'
    },

    controller: function (AuthService, $log, $state, $translate) {

      this.$onInit = () => {
        this.lang = $translate.use();
      };

      this.setLanguage = (code) => {
        $translate.use(code);
        this.lang = $translate.use();
      };

      this.logout = () => {
        AuthService.logout().then(() => {
          $state.go('main.list');
        }).catch(() => {
          $log.debug('Not logged');
        });
      };
    }
  });