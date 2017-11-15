'use strict';

angular.module('recipesApp')

  .component('usersList', {

    templateUrl: 'js/components/usersList.html',

    bindings: {
      users: '<'
    },

    controller: function ($log) {

      this.$onInit = () => {
        $log.info('usersList component init');
      };
    }
  });