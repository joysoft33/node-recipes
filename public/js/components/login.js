'use strict';

angular.module('recipesApp')

  .component('login', {

    templateUrl: 'js/components/login.html',

    controller: function (AuthService, $state) {

      this.validate = () => {

        this.errorMessage = '';

        AuthService.login(this.user).then((user) => {
          $state.go('main.list');
        }).catch((err) => {
          this.errorMessage = err;
        });
      };
    }
  });