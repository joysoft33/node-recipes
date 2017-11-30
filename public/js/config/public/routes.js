/**
 * Public routes
 */
export default [{
  name: 'main.recipes',
  url: 'list?{categoryId:int}',
  params: {
    categoryId: {
      value: 0
    }
  },
  component: 'recipesList',
  resolve: {
    categories: (CategoriesService) => {
      return CategoriesService.query().$promise;
    },
    recipes: (RecipesService, $transition$) => {
      return RecipesService.query({
        categoryId: $transition$.params().categoryId
      }).$promise;
    }
  }
}, {
  name: 'main.recipe',
  url: 'recipe/:id',
  component: 'recipeDetails',
  resolve: {
    recipe: (RecipesService, $transition$) => {
      return RecipesService.get({
        id: $transition$.params().id
      }).$promise;
    }
  }
}, {
  name: 'main.add',
  url: 'add',
  component: 'recipeAdd',
  resolve: {
    categories: (CategoriesService) => {
      return CategoriesService.query().$promise;
    }
  },
  data: {
    requiresLogin: true
  }
}];