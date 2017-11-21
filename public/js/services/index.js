import angular from 'angular';
import resources from 'angular-resource';
import localStorage from 'angular-local-storage';

import checkRoute from './CheckRouteService';
import categories from './CategoriesService';
import recipes from './RecipesService';
import users from './UsersService';
import auth from './AuthService';

const services = angular.module('appServices', [
  localStorage,
  resources
]);

services
  .factory('CategoriesService', categories)
  .factory('CheckRouteService', checkRoute)
  .factory('RecipesService', recipes)
  .factory('UsersService', users)
  .factory('AuthService', auth);

export default services.name;