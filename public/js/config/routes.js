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
            return RecipesService.getRecipes();
          }
        }
      })
      .state({
        name: 'details',
        url: '/details/:id',
        component: 'recipeDetails',
        resolve: {
          recipe: function (RecipesService, $transition$) {
            return RecipesService.getRecipe($transition$.params().id);
          }
        }
      })
      .state({
        name: 'add',
        url: '/add',
        component: 'recipeAdd',
        resolve: {
          categories: function (CategoriesService) {
            return CategoriesService.getCategories();
          }
        }
      });

      $urlRouterProvider.otherwise('/');
  });