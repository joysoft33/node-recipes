import angular from 'angular';
import resources from 'angular-resource';
import localStorage from 'angular-local-storage';
import ngmap from 'ngmap';

import geolocation from './common/GeolocationService';
import routes from './common/RoutesService';
import users from './common/UsersService';
import auth from './common/AuthService';

const services = angular.module('adminServices', [
  localStorage,
  resources,
  ngmap
]);

services
  .factory('GeolocationService', geolocation)
  .factory('RoutesService', routes)
  .factory('UsersService', users)
  .factory('AuthService', auth);

export default services.name;