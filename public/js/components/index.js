import angular from 'angular';
import translate from 'angular-translate';

import navbar from './navbar/navbar';
import login from './login/login';
import error from './error/error';
import main from './main/main';

import recipeDetails from './recipes/recipeDetails/recipeDetails';
import recipesList from './recipes/recipesList/recipesList';
import recipeAdd from './recipes/recipeAdd/recipeAdd';

import usersList from './users/usersList/usersList';
import userDetails from './users/userDetails/userDetails';

const components = angular.module('appComponents', [
  translate
]);

components
  .component('navbar', navbar)
  .component('login', login)
  .component('error', error)
  .component('main', main)
  .component('recipeDetails', recipeDetails)
  .component('recipesList', recipesList)
  .component('recipeAdd', recipeAdd)
  .component('usersList', usersList)
  .component('userDetails', userDetails);

export default components.name;