import angular from 'angular';
import messages from 'angular-messages';
import translate from 'angular-translate';

import 'font-awesome/css/font-awesome.css';
import 'bulma/bulma.sass';

import 'angular-fontawesome';

import resetPassword from './common/resetPassword/resetPassword';
import lostPassword from './common/lostPassword/lostPassword';
import errorMessages from './common/errorMessages/errorMessages';
import paginator from './common/paginator/paginator';
import modal from './common/modal/modal';
import login from './common/login/login';
import error from './common/error/error';
import main from './common/main/main';

import recipeDetails from './public/recipes/recipeDetails';
import recipesList from './public/recipes/recipesList';
import recipeEdit from './public/recipes/recipeEdit';
import recipeCard from './public/recipes/recipeCard';
import navbar from './public/navbar/navbar';

const components = angular.module('publicComponents', [
  messages,
  translate,
  'picardy.fontawesome'
]);

components
  .component('errorMessages', errorMessages)
  .component('resetPassword', resetPassword)
  .component('lostPassword', lostPassword)
  .component('paginator', paginator)
  .component('navbar', navbar)
  .component('modal', modal)
  .component('login', login)
  .component('error', error)
  .component('main', main)
  .component('recipeDetails', recipeDetails)
  .component('recipesList', recipesList)
  .component('recipeEdit', recipeEdit)
  .component('recipeCard', recipeCard);

export default components.name;