import htmlTemplate from './usersList.html';

export default {

  template: htmlTemplate,

  bindings: {
    users: '<'
  },

  controller: function controller($log) {
    'ngInject';

    this.$onInit = () => {
      $log.info('usersList component init', this.users);
    };
  }
};