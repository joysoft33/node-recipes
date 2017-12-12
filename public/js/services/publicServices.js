import angular from 'angular';
import resources from 'angular-resource';
import localStorage from 'angular-local-storage';

import categories from './common/CategoriesService';
import cloudinary from './common/CloudinaryService';
import recipes from './common/RecipesService';
import routes from './common/RoutesService';
import users from './common/UsersService';
import auth from './common/AuthService';

const services = angular.module('publicServices', [
  localStorage,
  resources
]);

services
  .factory('CategoriesService', categories)
  .factory('CloudinaryService', cloudinary)
  .factory('RecipesService', recipes)
  .factory('RoutesService', routes)
  .factory('UsersService', users)
  .factory('AuthService', auth);

export default services.name;