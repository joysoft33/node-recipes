export default checkRouteService;

/**
 * The check route service
 * @param {*} AuthService
 * @param {*} $log
 * @param {*} $q
 * @param {*} $transitions
 * @return {*}
 */
function checkRouteService(AuthService, $log, $q, $transitions) {
  'ngInject';

  const service = {};

  service.initialize = function initialize() {
    // Check ui-router transitions
    $transitions.onBefore({}, service.check);
  };

  service.check = function check(transition) {

    // Get the requested route
    const to = transition.to();

    if (!to.publicRoute) {
      // The destination route is marked as private
      return $q((resolve) => {
        // Get the currently connected user
        AuthService.getCurrent().then((user) => {
          if (user) {
            // A user is connected
            $log.debug(`${to.url} authenticated`);
            resolve();
          } else {
            // User isn’t authenticated
            $log.debug(`${to.url} need authentication`);
            // Redirect to login page
            resolve(transition.router.stateService.target('main.login', {
              redirect: to.name
            }));
          }
        });
      });
    }
  };

  return service;
}