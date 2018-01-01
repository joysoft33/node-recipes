import htmlTemplate from './resetPassword.html';

export default {

  template: htmlTemplate,

  bindings: {
    token: '@'
  },

  controller: function controller(AuthService, UsersService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('resetPassword component init');
    };

    this.validate = () => {
      if (this.form.$valid) {
        this.errorMessage = '';
        AuthService.resetPassword(this.token, this.password).then(() => {
          $state.go('main');
        }).catch((err) => {
          this.errorMessage = err;
        });
      }
    };
  }
};