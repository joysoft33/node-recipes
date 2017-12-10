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
      dynamic: true,
      value: 0
    },
    page: {
      dynamic: true,
      value: 1
    }
  },
  resolve: {
    categories: ['CategoriesService', (CategoriesService) => {
      return CategoriesService.query().$promise;
    }],
    category: ['$transition$', ($transition$) => {
      return $transition$.params().category;
    }],
    page: ['$transition$', ($transition$) => {
      return $transition$.params().page;
    }]
  },
  data: {
    defaultRoute: true
  }
}, {
  name: 'main.recipes.details',
  url: '/{id: int}',
  component: 'recipeDetails',
  resolve: {
    recipe: ['RecipesService', '$transition$', (RecipesService, $transition$) => {
      return RecipesService.get({
        id: $transition$.params().id
      }).$promise;
    }]
  }
}, {
  name: 'main.recipes.add',
  url: '/add',
  component: 'recipeAdd',
  resolve: {
    categories: ['CategoriesService', (CategoriesService) => {
      return CategoriesService.query().$promise;
    }]
  },
  data: {
    requiresLogin: true
  }
}];