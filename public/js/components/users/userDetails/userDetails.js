import htmlTemplate from './userDetails.html';

export default {

  template: htmlTemplate,

  bindings: {
    user: '<'
  },

  controller: function controller(UsersService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('userDetails component init', this.user);
    };

    this.validate = () => {
      this.user.$save().then(() => {
        $state.go('main.recipes');
      }).catch((err) => {
        $log.error('Error:', err);
      });
    };
  }
};