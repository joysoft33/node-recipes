import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import cookies from 'angular-cookies';
import fileUpload from 'ng-file-upload';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import components from './components';
import services from './services';
import config from './config';

import '../css/index.scss';

const app = angular.module('recipesApp', [
  uiRouter,
  cookies,
  fileUpload,
  components,
  services
]);

app
  .constant('CONSTANTS', config.constants)
  .config(config.translate)
  .config(config.storage)
  .config(config.routes)
  .run(config.run);

export default app;