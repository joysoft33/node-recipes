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
      this.paginator = {
        count: Math.round(this.recipes.count / this.recipes.limit),
        page: Math.round(this.recipes.offset / this.recipes.limit)
      };
    };
  }
};