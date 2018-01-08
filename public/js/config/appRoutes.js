import routes from './common/routes';

export default (specific, defaultUrl) => {

  /**
   * The routes configuration
   * @param {*} $stateProvider
   * @param {*} $urlRouterProvider
   */
  function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject';

    routes.concat(specific).forEach((route) => {
      $stateProvider.state(route);
    });

    $urlRouterProvider.otherwise(defaultUrl);
    $locationProvider.html5Mode(true);
  }

  return routesConfig;
};