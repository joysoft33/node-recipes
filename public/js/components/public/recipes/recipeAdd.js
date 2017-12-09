import htmlTemplate from './recipeAdd.html';

export default {

  template: htmlTemplate,

  bindings: {
    categories: '<'
  },

  controller: function controller($log, $state, RecipesService) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipeAdd component init');
      this.recipe = new RecipesService();
      this.maxFileSize = 2;
    };

    this.validate = (file) => {
      if (this.form.$valid) {
        this.recipe.uploadImage(file, (progress) => {
          this.progress = progress;
        }).then((result) => {
          this.recipe.image = result.url;
          return this.recipe.$save();
        }).then(() => {
          $state.go('main.recipes.list');
        }).catch((error) => {
          this.error = error.statusText;
        });
      }
    };
  }
};