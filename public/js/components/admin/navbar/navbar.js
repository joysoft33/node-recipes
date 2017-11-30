import htmlTemplate from './navbar.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  controller: function controller($translate) {
    'ngInject';

    this.$onInit = () => {
      $translate.use('fr');
    };
  }
};