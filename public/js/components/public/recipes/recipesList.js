import htmlTemplate from './recipesList.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  bindings: {
    categories: '<',
    category: '<',
    page: '<'
  },

  controller: function controller(CONSTANTS, RecipesService, $log) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipesList component init');
      this.getRecipes();
    };

    this.uiOnParamsChanged = function uiOnParamsChanged(newParams) {
      if (typeof newParams.category !== 'undefined') {
        this.category = parseInt(newParams.category || 0, 10);
      }
      if (typeof newParams.page !== 'undefined') {
        this.page = parseInt(newParams.page || 0, 10);
      }
      this.getRecipes();
    };

    // Request one page of recipes
    this.getRecipes = () => {
      RecipesService.queryPaginated({
        offset: this.page * CONSTANTS.MAX_PER_PAGES,
        limit: CONSTANTS.MAX_PER_PAGES,
        category: this.category
      }).$promise.then((results) => {
        this.recipes = results.rows;
        this.setPaginator(results);
      });
    };

    // Set paginator parameters
    this.setPaginator = (results) => {
      if (results.count > results.limit) {
        this.paginator = {
          count: Math.ceil(results.count / results.limit),
          page: Math.ceil(results.offset / results.limit)
        };
      } else {
        delete this.paginator;
      }
    };

  }
};