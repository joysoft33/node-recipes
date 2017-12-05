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
      if (this.recipes.count > this.recipes.limit) {
        this.paginator = {
          count: Math.ceil(this.recipes.count / this.recipes.limit),
          page: Math.ceil(this.recipes.offset / this.recipes.limit)
        };
      }
      $log.info('recipesList component init', this.paginator);
    };
  }
};