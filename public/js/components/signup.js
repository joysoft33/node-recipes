'use strict';

angular.module('recipesApp')

  .component('signup', {

    templateUrl: 'js/components/signup.html',

    controller: function (UsersService, $state) {

      this.$onInit = () => {
        this.user = new UsersService();
      };

      this.validate = () => {
        this.user.$save((user) => {
          $state.go('main.list');
        }).catch((err) => {
          this.errorMessage = err;
        });
      };
    }
  });