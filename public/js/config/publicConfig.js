import checkAuth from './common/checkAuth';
import constants from './common/constants';
import storage from './common/storage';

import translate from './public/translate';
import routes from './public/routes';
import appRoutes from './appRoutes';

export default {
  routes: appRoutes(routes, '/list'),
  constants: constants,
  translate: translate,
  storage: storage,
  auth: checkAuth
};