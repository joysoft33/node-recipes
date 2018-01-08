import constants from './common/constants';
import storage from './common/storage';
import auth from './common/checkAuth';
import states from './common/states';

import appTranslate from './appTranslate';
import appRoutes from './appRoutes';

import translate from './public/translate';
import routes from './public/routes';

export default {
  routes: appRoutes(routes, '/recipes'),
  translate: appTranslate(translate),
  constants,
  storage,
  states,
  auth
};