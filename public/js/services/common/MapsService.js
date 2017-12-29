/* eslint no-undef: "off" */
export default mapsService;

/**
 * The Google Maps service.
 * @param {*} $q
 * @return {*} The service object itself
 */
function mapsService(CONSTANTS, $q, $timeout, $window) {
  'ngInject';

  this.$google = null;
  const service = {};

  /**
   * Retrieve current position
   */
  service.loadGoogleApi = () => {
    const defer = $q.defer();

    if (this.$google == null) {
      // Script loaded callback, send resolve
      $window.initMap = () => {
        this.$google = google;
        defer.resolve(google);
      };
      // Start loading script
      const script = $window.document.createElement('script');
      script.src = `//maps.googleapis.com/maps/api/js?language=fr&libraries=places&callback=initMap&key=${CONSTANTS.GOOGLE_API_KEY}`;
      $window.document.body.appendChild(script);
    } else {
      defer.resolve(this.$google);
    }

    return defer.promise;
  };

  return service;
}