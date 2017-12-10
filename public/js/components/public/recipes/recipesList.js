import htmlTemplate from './recipesList.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  bindings: {
    categories: '<',
    category: '@',
    page: '@'
  },

  controller: function controller(CONSTANTS, RecipesService, $log) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipesList component init');
      this.getRecipes();
    };

    this.uiOnParamsChanged = function uiOnParamsChanged(newParams) {
      if (typeof newParams.category !== 'undefined') {
        this.category = newParams.category;
      }
      if (typeof newParams.page !== 'undefined') {
        this.page = newParams.page;
      }
      this.getRecipes();
    };

    // Request one page of recipes
    // The page number is 1 based
    this.getRecipes = () => {
      RecipesService.queryPaginated({
        offset: ((parseInt(this.page, 10) || 1) - 1) * CONSTANTS.MAX_PER_PAGES,
        category: parseInt(this.category, 10) || 0,
        limit: CONSTANTS.MAX_PER_PAGES
      }).$promise.then((results) => {
        this.recipes = results.rows;
        this.setPaginator(results);
      });
    };

    // Set paginator parameters
    this.setPaginator = (results) => {
      if (results.count > results.limit) {
        this.paginator = {
          page: Math.ceil(results.offset / results.limit) + 1,
          count: Math.ceil(results.count / results.limit)
        };
      } else {
        delete this.paginator;
      }
    };

  }
};