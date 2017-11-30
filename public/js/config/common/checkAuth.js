export default checkAuth;

/**
 * The authentication check upon page change
 * @param {*} RoutesService
 */
function checkAuth(RoutesService) {
  'ngInject';

  RoutesService.initialize();
}