import checkAuth from './checkAuth';
import constants from './constants';
import translate from './translate';
import storage from './storage';
import routes from './routes';

export default {
  constants: constants,
  translate: translate,
  storage: storage,
  routes: routes,
  auth: checkAuth
};