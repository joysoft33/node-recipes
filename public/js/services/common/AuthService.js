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

  /**
   * Let server authenticate the given email/password
   * @param {*} credential
   */
  service.login = function login(credential) {
    return $q((resolve, reject) => {
      $http.post('/api/auth/login', credential).then((res) => {
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

  /**
   * Disconnect password
   */
  service.logout = function logout() {
    return $timeout(() => {
      service.removeToken();
    }, 0);
  };

  /**
   * Start password reset process
   * @param {*} email
   */
  service.lostPassword = function lostPassword(email) {
    return $q((resolve, reject) => {
      $http.post('/api/auth/lostPassword', {
        email
      }).then(() => {
        resolve();
      }).catch((err) => {
        let message;
        if (err.data) {
          message = typeof err.data === 'string' ? err.data : err.data.message;
        }
        reject(message || err.statusText);
      });
    });
  };

  /**
   * Save new user password
   * @param {*} token
   * @param {*} password
   */
  service.resetPassword = function resetPassword(token, password) {
    return $q((resolve, reject) => {
      $http.post('/api/auth/resetPassword', {
        token,
        password
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        resolve();
      }).catch((err) => {
        let message;
        if (err.data) {
          message = typeof err.data === 'string' ? err.data : err.data.message;
        }
        reject(message || err.statusText);
      });
    });
  };

  /**
   * Return the connected user or undefined
   */
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

  /**
   * Save the received JWT token
   * @param {*} token
   */
  service.setToken = function setToken(token) {
    localStorageService.set(CONSTANTS.AUTH_TOKEN, token);
  };

  /**
   * Return the saved JWT token
   */
  service.getToken = function getToken() {
    return localStorageService.get(CONSTANTS.AUTH_TOKEN);
  };

  /**
   * Destroy the saved JWT token
   */
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
    const data = $window.decodeURIComponent(escape($window.atob(output)));
    return data ? angular.fromJson(data) : null;
  }

  /**
   * Determine if the authentication JWT token has expired
   * @param {*} payload
   * @return {boolean} true if expired else false
   */
  function isTokenExpired(payload) {
    // No expiration date
    if (typeof payload.exp === 'undefined') {
      return false;
    }
    // The 0 here is the key, which sets the date to the epoch
    const d = new Date(0);
    d.setUTCSeconds(payload.exp);
    // true if token expired
    return d.valueOf() <= new Date().valueOf();
  }
}