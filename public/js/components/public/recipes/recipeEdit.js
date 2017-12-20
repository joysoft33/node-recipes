import htmlTemplate from './recipeEdit.html';

export default {

  template: htmlTemplate,

  bindings: {
    categories: '<',
    recipe: '<'
  },

  controller: function controller(CloudinaryService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipeEdit component init');
      this.maxFileSize = 2;
      this.progress = 0;
    };

    this.validate = (file) => {
      if (this.form.$valid) {
        this.isLoading = true;
        CloudinaryService.uploadFile(this.recipe.image, file, (progress) => {
          this.progress = progress;
        }).then((result) => {
          this.recipe.image = result.secure_url || this.recipe.image;
          return this.recipe.id ? this.recipe.$update() : this.recipe.$save();
        }).then(() => {
          $state.go('main.recipes.list');
        }).catch((error) => {
          this.error = error.statusText;
        }).finally(() => {
          this.isLoading = false;
        });
      }
    };
  }
};