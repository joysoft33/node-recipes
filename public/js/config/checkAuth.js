export default checkAuth;

/**
 * The authentication check upon page change
 * @param {*} CheckRouteService
 */
function checkAuth(CheckRouteService) {
  'ngInject';

  CheckRouteService.initialize();
}