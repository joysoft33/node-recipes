import angular from 'angular';
import translate from 'angular-translate';

import navbar from './navbar/navbar';
import login from './login/login';
import main from './main/main';

import recipeDetails from './recipes/recipeDetails/recipeDetails';
import recipesList from './recipes/recipesList/recipesList';
import recipeAdd from './recipes/recipeAdd/recipeAdd';

import usersList from './users/usersList/usersList';

const components = angular.module('appComponents', [
  translate
]);

components
  .component('navbar', navbar)
  .component('login', login)
  .component('main', main)
  .component('recipeDetails', recipeDetails)
  .component('recipesList', recipesList)
  .component('recipeAdd', recipeAdd)
  .component('usersList', usersList);

export default components.name;