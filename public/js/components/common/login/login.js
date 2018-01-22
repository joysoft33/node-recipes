import angular from 'angular';

import htmlTemplate from './login.html';

export default {

  template: htmlTemplate,

  bindings: {
    redirect: '@',
    params: '@'
  },

  controller: function controller(AuthService, UsersService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('login component init');
    };

    this.validate = () => {
      if (this.form.$valid) {
        this.errorMessage = '';
        if (this.createAccount) {
          UsersService.save(this.user).$promise.then(() => {
            return AuthService.login(this.user);
          }).then(() => {
            $state.go(this.redirect || 'main');
          }).catch((err) => {
            this.errorMessage = err;
          });
        } else {
          AuthService.login(this.user).then(() => {
            if (this.redirect) {
              $state.go(this.redirect, angular.fromJson(this.params));
            } else {
              $state.go('main');
            }
          }).catch((err) => {
            this.errorMessage = err;
          });
        }
      }
    };
  }
};