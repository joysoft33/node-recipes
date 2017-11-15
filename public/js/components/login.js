'use strict';

angular.module('recipesApp')

  .component('login', {

    templateUrl: 'js/components/login.html',

    controller: function (AuthService, UsersService, $log, $state) {

      this.$onInit = () => {
        $log.info('login component init');
      };

      this.validate = () => {

        this.errorMessage = '';

        if (this.createAccount) {
          UsersService.save(this.user).$promise.then(() => {
            return AuthService.login(this.user);
          }).then(() => {
            $state.go('main.recipes');
          }).catch((err) => {
            this.errorMessage = err;
          });
        } else {
          AuthService.login(this.user).then(() => {
            $state.go('main.recipes');
          }).catch((err) => {
            this.errorMessage = err;
          });
        }
      };
    }
  });