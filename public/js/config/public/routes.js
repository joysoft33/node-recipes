/**
 * Public routes
 */
export default [{
  name: 'main.recipes',
  abstract: true,
  url: '/recipes'
}, {
  name: 'main.recipes.list',
  url: '?{categoryId:int}',
  component: 'recipesList',
  params: {
    categoryId: {
      value: 0
    }
  },
  resolve: {
    categories: (CategoriesService) => {
      return CategoriesService.query().$promise;
    },
    recipes: (RecipesService, $transition$) => {
      return RecipesService.query({
        categoryId: $transition$.params().categoryId
      }).$promise;
    }
  },
  data: {
    defaultRoute: true
  }
}, {
  name: 'main.recipes.details',
  url: '/{id: int}',
  component: 'recipeDetails',
  resolve: {
    recipe: (RecipesService, $transition$) => {
      return RecipesService.get({
        id: $transition$.params().id
      }).$promise;
    }
  }
}, {
  name: 'main.recipes.add',
  url: '/add',
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