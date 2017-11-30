import htmlTemplate from './recipesList.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  bindings: {
    categories: '<',
    recipes: '<'
  },

  controller: function controller($log) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipesList component init');
    };
  }
};