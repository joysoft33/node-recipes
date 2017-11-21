import angular from 'angular';

export default authService;

/**
 * The authentication service.
 * @param {*} CONSTANTS
 * @param {*} $http
 * @param {*} $q
 * @param {*} $timeout
 * @param {*} $window
 * @param {*} $rootScope
 * @param {*} localStorageService
 * @return {*} The service object itself
 */
function authService(CONSTANTS, $http, $q, $timeout, $window, $rootScope, localStorageService) {
  'ngInject';

  const service = {};

  service.login = function login(credential) {
    return $q((resolve, reject) => {
      // Let server authenticate the given email/password
      $http.post(CONSTANTS.AUTH_URL, credential).then((res) => {
        service.setToken(res.data.token);
        const payload = decodeToken(res.data.token);
        $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, payload);
        resolve(payload);
      }).catch((err) => {
        service.removeToken();
        let message;
        if (err.data) {
          message = typeof err.data === 'string' ? err.data : err.data.message;
        }
        reject(message || err.statusText);
      });
    });
  };

  service.logout = function logout() {
    return $timeout(() => {
      service.removeToken();
    }, 0);
  };

  service.getUser = function getUser() {
    const token = service.getToken();
    if (token) {
      const payload = decodeToken(token);
      if (payload) {
        return payload;
      }
      service.removeToken();
    }
  };

  service.setToken = function setToken(token) {
    localStorageService.set(CONSTANTS.AUTH_TOKEN, token);
  };

  service.getToken = function getToken() {
    return localStorageService.get(CONSTANTS.AUTH_TOKEN);
  };

  service.removeToken = function removeToken() {
    if (localStorageService.get(CONSTANTS.AUTH_TOKEN)) {
      localStorageService.remove(CONSTANTS.AUTH_TOKEN);
      $rootScope.$broadcast(CONSTANTS.AUTH_EVENT);
    }
  };

  return service;

  /**
   * Decode a JWT token payload
   * @param {*} token
   * @return {*} The decoded token payload
   */
  function decodeToken(token) {
    // Decode the encrypted payload
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    const payload = urlBase64Decode(parts[1]);
    if (!payload) {
      throw new Error('Cannot decode the token');
    }
    if (isTokenExpired(payload)) {
      $http.defaults.headers.common.Authorization = '';
      return null;
    }
    // Add jwt token to auth header for all requests made by the $http service
    $http.defaults.headers.common.Authorization = `Bearer ${token}`;
    return payload;
  }

  /**
   * Decode a JWT token payload
   * @param {*} str
   * @return {*}
   */
  function urlBase64Decode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    // polyfill https://github.com/davidchambers/Base64.js
    const data = $window.decodeURIComponent(escape($window.atob(output)));
    return data ? angular.fromJson(data) : null;
  }

  function getTokenExpirationDate(payload) {
    if (typeof payload.exp === 'undefined') {
      return null;
    }
    // The 0 here is the key, which sets the date to the epoch
    const d = new Date(0);
    d.setUTCSeconds(payload.exp);
    return d;
  }

  function isTokenExpired(payload, offsetSeconds) {
    const d = getTokenExpirationDate(payload);
    const offset = offsetSeconds || 0;
    if (d === null) {
      return false;
    }
    // Token expired?
    return !(d.valueOf() > (new Date().valueOf() + (offset * 1000)));
  }
}