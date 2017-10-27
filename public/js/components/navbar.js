'use strict';

angular.module('recipesApp')

  .component('navbar', {

    templateUrl: 'js/components/navbar.html',

    controller: function ($translate) {

      this.setLanguage = (code) => {
        $translate.use(code);
      };

      this.getLanguage = () => {
        $translate.use();
      };

    }
  });