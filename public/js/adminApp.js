import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import cookies from 'angular-cookies';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import components from './components/adminComponents';
import services from './services/adminServices';
import config from './config/adminConfig';

import '../css/admin.scss';

const app = angular.module('adminApp', [
  uiRouter,
  cookies,
  components,
  services
]);

app
  .constant('CONSTANTS', config.constants)
  .config(config.translate)
  .config(config.storage)
  .config(config.routes)
  .run(config.auth);

export default app.name;