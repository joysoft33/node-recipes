export default geolocationService;

/**
 * The geolocation service.
 * @param {*} $q
 * @return {*} The service object itself
 */
function geolocationService($q, $window) {
  'ngInject';

  const service = {};

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
      defer.reject({
        msg: 'Browser does not supports HTML5 geolocation'
      });
    }
    return defer.promise;
  };

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