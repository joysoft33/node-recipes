export default routesConfig;

/**
 * The routes configuration
 * @param {*} $stateProvider
 * @param {*} $urlRouterProvider
 */
function routesConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider

    .state('main', {
      url: '/',
      component: 'main',
      abstract: true,
      resolve: {
        loggedUser: (AuthService) => {
          return AuthService.getCurrent();
        }
      }
    })

    .state('main.recipes', {
      url: 'list?{categoryId:int}',
      publicRoute: true,
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
    })

    .state('main.details', {
      url: 'details/:id',
      publicRoute: true,
      component: 'recipeDetails',
      resolve: {
        recipe: (RecipesService, $transition$) => {
          return RecipesService.get({
            id: $transition$.params().id
          }).$promise;
        }
      }
    })

    .state('main.add', {
      url: 'add',
      component: 'recipeAdd',
      resolve: {
        categories: (CategoriesService) => {
          return CategoriesService.query().$promise;
        }
      }
    })

    .state('main.login', {
      url: 'login',
      publicRoute: true,
      component: 'login'
    })

    .state('main.users', {
      url: 'users',
      component: 'usersList',
      resolve: {
        users: (UsersService) => {
          return UsersService.query().$promise;
        }
      }
    });

  $urlRouterProvider.otherwise('/list');
}