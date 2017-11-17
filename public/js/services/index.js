import angular from 'angular';
import resources from 'angular-resource';
import localStorage from 'angular-local-storage';

import auth from './AuthService';
import check from './CheckRouteService';
import categories from './CategoriesService';
import recipes from './RecipesService';
import users from './UsersService';

const services = angular.module('appServices', [
  localStorage,
  resources
]);

services
  .factory('AuthService', auth)
  .factory('CheckRouteService', check)
  .factory('CategoriesService', categories)
  .factory('RecipesService', recipes)
  .factory('UsersService', users);

export default services.name;