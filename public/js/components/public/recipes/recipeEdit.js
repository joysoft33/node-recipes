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
      $log.info('recipeAdd component init');
      this.maxFileSize = 2;
    };

    this.validate = (file) => {
      if (this.form.$valid) {
        CloudinaryService.presign(file.name, file.type).then((result) => {
          return CloudinaryService.uploadFile(file, result, (progress) => {
            this.progress = progress;
          });
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