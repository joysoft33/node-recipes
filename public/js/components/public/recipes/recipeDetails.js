import htmlTemplate from './recipeDetails.html';

export default {

  template: htmlTemplate,

  require: {
    parent: '^main'
  },

  bindings: {
    recipe: '<'
  },

  controller: function controller(RecipesService, CloudinaryService, $log, $state) {
    'ngInject';

    this.$onInit = () => {
      $log.info('recipeDetails component init');
      this.isModifAllowed = this.parent.isOwnerOrAdmin(this.recipe.userId);
    };

    this.delete = () => {
      RecipesService.delete({
        id: this.recipe.id
      }).$promise.then(() => {
        return CloudinaryService.deleteFile(this.recipe);
      }).then(() => {
        $state.go('main.recipes.list');
      }).catch((error) => {
        this.error = error.statusText;
      });
    };
  }

};