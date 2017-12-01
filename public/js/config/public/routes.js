/**
 * Public routes
 */
export default [{
  name: 'main.recipes',
  abstract: true,
  url: '/recipes'
}, {
  name: 'main.recipes.list',
  url: '?{category:int}&{page:int}',
  component: 'recipesList',
  params: {
    category: {
      value: 0
    },
    page: {
      value: 0
    }
  },
  resolve: {
    categories: (CategoriesService) => {
      return CategoriesService.query().$promise;
    },
    recipes: (CONSTANTS, RecipesService, $transition$) => {
      const offset = parseInt($transition$.params().page || 0, 10);
      return RecipesService.queryPaginated({
        category: $transition$.params().category,
        offset: offset * CONSTANTS.MAX_PER_PAGES,
        limit: CONSTANTS.MAX_PER_PAGES
      }).$promise;
    },
    page: ($transition$) => {
      return parseInt($transition$.params().page || 0, 10);
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