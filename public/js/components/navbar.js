'use strict';

angular.module('recipesApp')

  .component('navbar', {

    templateUrl: 'js/components/navbar.html',

    require: {
      parent: '^main'
    },

    controller: function (CONSTANTS, AuthService, $log, $cookies, $state, $translate) {

      this.$onInit = () => {
        let lang = $cookies.get(CONSTANTS.COOKIE);
        if (lang) {
          $translate.use(lang);
          this.lang = lang;
        } else {
          this.lang = $translate.use();
        }
      };

      this.setLanguage = (code) => {
        $translate.use(code);
        this.lang = $translate.use();
        $cookies.put(CONSTANTS.COOKIE, this.lang);
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