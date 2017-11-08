'use strict';

angular.module('recipesApp')

  .component('navbar', {

    templateUrl: 'js/components/navbar.html',

    controller: function ($translate) {

      this.$onInit = () => {
        this.lang = $translate.use();
      };

      this.setLanguage = (code) => {
        $translate.use(code);
        this.lang = $translate.use();
      };

    }
  });