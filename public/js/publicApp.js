import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import cookies from 'angular-cookies';
import fileUpload from 'ng-file-upload';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import components from './components/publicComponents';
import services from './services/publicServices';
import config from './config/publicConfig';

import '../css/public.scss';

const app = angular.module('publicApp', [
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
  .run(config.auth);

export default app.name;