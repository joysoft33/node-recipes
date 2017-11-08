'use strict';

angular.module('recipesApp')

  .config(($stateProvider, $urlRouterProvider) => {

    $stateProvider

      .state('main', {
        url: '/',
        component: 'main',
        abstract: true,
        resolve: {
          categories: (CategoriesService) => {
            return CategoriesService.query().$promise;
          }
        }
      })

      .state('main.list', {
        url: 'list?{categoryId:int}',
        params: {
          categoryId: {
            value: 0
          }
        },
        component: 'recipesList',
        resolve: {
          recipes: (RecipesService, $transition$) => {
            return RecipesService.query({
              categoryId: $transition$.params().categoryId
            }).$promise;
          }
        }
      })

      .state('main.details', {
        url: 'details/:id',
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
        component: 'recipeAdd'
      });

    $urlRouterProvider.otherwise('/list');
  });