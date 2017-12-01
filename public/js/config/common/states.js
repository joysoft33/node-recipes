export default statesConfig;

/**
 * The router states configuration
 * @param {*} $state
 * @param {*} $log
 */
function statesConfig($state, $log) {
  'ngInject';

  $state.defaultErrorHandler((error) => {
    $log.info(`Routes error handler: ${error}`);
  });
}