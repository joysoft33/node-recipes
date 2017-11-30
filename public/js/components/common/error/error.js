import htmlTemplate from './error.html';

export default {

  template: htmlTemplate,

  bindings: {
    error: '<'
  },

  controller: function controller($log) {
    'ngInject';

    this.$onInit = () => {
      $log.info('error component init', this.error);
    };
  }
};