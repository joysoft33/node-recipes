import htmlTemplate from './lostPassword.html';

export default {

  template: htmlTemplate,

  controller: function controller(AuthService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('lostPassword component init');
    };

    this.validate = (email) => {
      if (this.form.$valid) {
        this.errorMessage = '';
        AuthService.lostPassword(email).then(() => {
          $state.go('main');
        }).catch((err) => {
          this.errorMessage = err;
        });
      }
    };
  }
};