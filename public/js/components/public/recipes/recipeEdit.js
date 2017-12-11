import htmlTemplate from './recipeEdit.html';

export default {

  template: htmlTemplate,

  bindings: {
    categories: '<',
    recipe: '<'
  },

  controller: function controller($log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipeAdd component init');
      this.maxFileSize = 2;
    };

    this.validate = (file) => {
      if (this.form.$valid) {
        this.recipe.uploadImage(file, (progress) => {
          this.progress = progress;
        }).then((result) => {
          this.recipe.image = result.url || this.recipe.image;
          return this.recipe.id ? this.recipe.$update() : this.recipe.$save();
        }).then(() => {
          $state.go('main.recipes.list');
        }).catch((error) => {
          this.error = error.statusText;
        });
      }
    };
  }
};