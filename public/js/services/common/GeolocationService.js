export default geolocationService;

/**
 * The geolocation service.
 * @param {*} $q
 * @return {*} The service object itself
 */
function geolocationService($q, $timeout, $window) {
  'ngInject';

  const service = {};

  /**
   * Retrieve current position
   */
  service.getLocation = () => {
    const defer = $q.defer();
    // Check the browser support HTML5 Geolocation API
    if ($window.navigator && $window.navigator.geolocation) {
      $window.navigator.geolocation.getCurrentPosition((coordinates) => {
        defer.resolve({
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude
        });
      });
    } else {
      defer.reject();
    }
    return defer.promise;
  };

  /**
   * Watch current position
   * @param {*} callback The function to be called when the position has changed
   * @return The watchPosition identifier
   */
  service.watchLocation = (callback) => {
    let watchId;
    if ($window.navigator && $window.navigator.geolocation) {
      if (typeof callback === 'function') {
        watchId = $window.navigator.geolocation.watchPosition((coordinates) => {
          // Force callback execution inside the Angular context by defer callback execution
          $timeout(() => {
            callback({
              lat: coordinates.coords.latitude,
              lng: coordinates.coords.longitude
            });
          }, 0);
        });
      }
    }
    return watchId;
  };

  /**
   * Terminate a position watch
   * @param {*} watchId
   */
  service.watchCancel = (watchId) => {
    if ($window.navigator && $window.navigator.geolocation) {
      $window.navigator.geolocation.clearWatch(watchId);
    }
  };

  /**
   * Compute distance between two geo positions
   * @param {*} coords1
   * @param {*} coords2
   * @param {*} isMiles
   */
  service.getDistance = (coords1, coords2, isMiles = false) => {

    const rad = val => Math.PI * (val / 180);

    const lat1 = coords1.lat;
    const lng1 = coords1.lng;

    const lat2 = coords2.lat;
    const lng2 = coords2.lng;

    // km
    const R = 6371;

    const x1 = lat2 - lat1;
    const dLat = rad(x1);
    const x2 = lng2 - lng1;
    const dLng = rad(x2);

    const a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
              (Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    if (isMiles) {
      d /= 1.60934;
    }

    return d;
  };

  return service;
}