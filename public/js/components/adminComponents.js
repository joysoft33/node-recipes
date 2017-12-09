import angular from 'angular';
import messages from 'angular-messages';
import translate from 'angular-translate';

import 'bulma/bulma.sass';

import paginator from './common/paginator/paginator';
import login from './common/login/login';
import error from './common/error/error';
import main from './common/main/main';

import usersList from './admin/users/usersList';
import userEdit from './admin/users/userEdit';
import navbar from './admin/navbar/navbar';

const components = angular.module('adminComponents', [
  messages,
  translate
]);

components
  .component('paginator', paginator)
  .component('navbar', navbar)
  .component('login', login)
  .component('error', error)
  .component('main', main)
  .component('usersList', usersList)
  .component('userEdit', userEdit);

export default components.name;