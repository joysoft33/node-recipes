import htmlTemplate from './paginator.html';

export default {

  template: htmlTemplate,

  bindings: {
    count: '<',
    page: '<'
  },

  controller: function controller($log) {

    this.$onInit = () => {
      $log.info(`paginator component init (${this.page}/${this.count})`);
      this.pages = new Array(this.count);
    };
  }
};