export default checkAuth;

/**
 * The check authentication upon page change
 * @param {*} CheckRouteService
 */
function checkAuth(CheckRouteService) {
  'ngInject';

  CheckRouteService.initialize();
}