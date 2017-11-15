'use strict';

angular.module('recipesApp')

  .component('navbar', {

    templateUrl: 'js/components/navbar.html',

    require: {
      parent: '^main'
    },

    controller: function (CONSTANTS, $log, $cookies, $translate) {

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
    }
  });