import angular from 'angular';
import resources from 'angular-resource';
import localStorage from 'angular-local-storage';

import routes from './RoutesService';
import users from './UsersService';
import auth from './AuthService';

const services = angular.module('adminServices', [
  localStorage,
  resources
]);

services
  .factory('RoutesService', routes)
  .factory('UsersService', users)
  .factory('AuthService', auth);

export default services.name;