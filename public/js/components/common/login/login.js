import htmlTemplate from './login.html';

export default {

  template: htmlTemplate,

  bindings: {
    redirect: '@'
  },

  controller: function controller(AuthService, UsersService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('login component init');
    };

    this.validate = () => {

      this.errorMessage = '';

      if (this.createAccount) {
        UsersService.save(this.user).$promise.then(() => {
          return AuthService.login(this.user);
        }).then(() => {
          $state.go(this.redirect || 'main.recipes');
        }).catch((err) => {
          this.errorMessage = err;
        });
      } else {
        AuthService.login(this.user).then(() => {
          $state.go(this.redirect || 'main.recipes');
        }).catch((err) => {
          this.errorMessage = err;
        });
      }
    };
  }
};