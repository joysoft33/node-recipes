import htmlTemplate from './errorMessages.html';

export default {

  template: htmlTemplate,

  bindings: {
    form: '<',
    field: '@'
  },

  controller: function controller($log) {
    this.$onInit = () => {
      $log.info(this.field);
    };
    this.$onChanges = (changes) => {
      $log.info(changes);
    };
  }
};