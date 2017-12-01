export default statesConfig;

/**
 * The router states configuration
 * @param {*} $state
 */
function statesConfig($state) {
  'ngInject';

  $state.defaultErrorHandler((error) => {
    console.log('TEST', error);
  });
}