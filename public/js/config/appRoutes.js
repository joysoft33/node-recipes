import routes from './common/routes';

export default (specific, defaultUrl) => {

  /**
   * The routes configuration
   * @param {*} $stateProvider
   * @param {*} $urlRouterProvider
   */
  function routesConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    routes.concat(specific).forEach((route) => {
      $stateProvider.state(route);
    });

    $urlRouterProvider.otherwise(defaultUrl);
  }

  return routesConfig;
};