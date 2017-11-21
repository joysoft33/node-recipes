export default storageConfig;

/**
 * The localStorage configuration
 * @param {*} localStorageServiceProvider
 */
function storageConfig(localStorageServiceProvider) {
  'ngInject';

  localStorageServiceProvider.setPrefix('recipes');
}