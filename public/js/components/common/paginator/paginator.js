import htmlTemplate from './paginator.html';

export default {

  template: htmlTemplate,

  bindings: {
    route: '@',
    count: '<',
    page: '<'
  },

  controller: function controller($log) {
    'ngInject';

    this.$onInit = () => {
      $log.info(`paginator component init (${this.route} ${this.page}/${this.count})`);
    };

    this.$onChanges = (changes) => {
      if (changes.count) {
        this.count = changes.count.currentValue;
      }
      if (changes.page) {
        this.page = changes.page.currentValue;
      }
      // Build a fake array to allow ng-repeat iteration
      this.pages = new Array(this.count);
    };
  }
};