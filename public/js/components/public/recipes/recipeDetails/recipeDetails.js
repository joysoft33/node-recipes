import htmlTemplate from './recipeDetails.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  bindings: {
    recipe: '<'
  },

  controller: function controller($log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipeDetails component init');
    };

    this.delete = () => {
      this.recipe.$delete(() => {
        $state.go('main.recipes.list');
      }, (error) => {
        this.error = error.statusText;
      });
    };
  }

};