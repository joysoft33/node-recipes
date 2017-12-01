import checkAuth from './common/checkAuth';
import constants from './common/constants';
import storage from './common/storage';
import states from './common/states';

import appTranslate from './appTranslate';
import appRoutes from './appRoutes';

import translate from './admin/translate';
import routes from './admin/routes';

export default {
  routes: appRoutes(routes, '/users'),
  translate: appTranslate(translate),
  constants: constants,
  storage: storage,
  states: states,
  auth: checkAuth
};