import angular from 'angular';
import translate from 'angular-translate';

import paginator from './public/paginator/paginator';
import navbar from './public/navbar/navbar';
import login from './common/login/login';
import error from './common/error/error';
import main from './common/main/main';

import recipeDetails from './public/recipes/recipeDetails/recipeDetails';
import recipesList from './public/recipes/recipesList/recipesList';
import recipeAdd from './public/recipes/recipeAdd/recipeAdd';

const components = angular.module('publicComponents', [
  translate
]);

components
  .component('paginator', paginator)
  .component('navbar', navbar)
  .component('login', login)
  .component('error', error)
  .component('main', main)
  .component('recipeDetails', recipeDetails)
  .component('recipesList', recipesList)
  .component('recipeAdd', recipeAdd);

export default components.name;