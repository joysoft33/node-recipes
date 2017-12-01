import checkAuth from './common/checkAuth';
import constants from './common/constants';
import storage from './common/storage';
import states from './common/states';

import translate from './public/translate';
import routes from './public/routes';
import appRoutes from './appRoutes';

export default {
  routes: appRoutes(routes, '/recipes'),
  constants: constants,
  translate: translate,
  storage: storage,
  states: states,
  auth: checkAuth
};