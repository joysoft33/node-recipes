'use strict';

angular.module('recipesApp')

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state({
        name: 'list',
        url: '/',
        component: 'recipesList',
        resolve: {
          recipes: function (RecipesService) {
            return RecipesService.query().$promise;
          }
        }
      })
      .state({
        name: 'details',
        url: '/details/:id',
        component: 'recipeDetails',
        resolve: {
          recipe: function (RecipesService, $transition$) {
            return RecipesService.get({
              id: $transition$.params().id
            }).$promise;
          }
        }
      })
      .state({
        name: 'add',
        url: '/add',
        component: 'recipeAdd',
        resolve: {
          categories: function (CategoriesService) {
            return CategoriesService.query().$promise;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  });