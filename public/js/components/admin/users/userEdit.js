import htmlTemplate from './userEdit.html';

export default {

  template: htmlTemplate,

  bindings: {
    user: '<'
  },

  controller: function controller(UsersService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('userEdit component init', this.user);
    };

    this.validate = () => {
      this.user.$update().then(() => {
        $state.go('main.users');
      }).catch((err) => {
        $log.error('Error:', err);
      });
    };
  }
};