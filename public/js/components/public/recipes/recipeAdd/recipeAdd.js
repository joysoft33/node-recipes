import htmlTemplate from './recipeAdd.html';

export default {

  template: htmlTemplate,

  bindings: {
    categories: '<'
  },

  controller: function controller($log, $state, RecipesService) {
    'ngInject';

    this.$onInit = () => {
      $log.info(`recipeAdd component init, ${this.categories ? this.categories.length : 0} categories`);
      this.recipe = new RecipesService();
      this.maxFileSize = 2;
    };

    this.validate = (file) => {
      this.recipe.uploadImage(file, (progress) => {
        this.progress = progress;
      }).then((result) => {
        this.recipe.image = result.url;
        return this.recipe.$save();
      }).then(() => {
        $state.go('main.recipes');
      }).catch((error) => {
        this.error = error.statusText;
      });
    };
  }
};