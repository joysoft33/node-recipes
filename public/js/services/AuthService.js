export default authService;

/**
 * The authentication service.
 * @param {*} CONSTANTS
 * @param {*} $http
 * @param {*} $q
 * @param {*} $timeout
 * @param {*} localStorageService
 * @param {*} $rootScope
 * @param {*} $window
 * @return {*}
 */
function authService(CONSTANTS, $http, $q, $timeout, localStorageService, $rootScope, $window) {
  'ngInject';

  let currentUser = null;
  const service = {};

  service.login = function login(credential) {
    return $q((resolve, reject) => {
      // Let server authenticate the given email/password
      $http.post(CONSTANTS.AUTH_URL, credential).then((res) => {
        return saveToken(res.data.token);
      }).then((user) => {
        currentUser = user;
        resolve(currentUser);
      }).catch((err) => {
        removeToken();
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
      // Just remove the authentication token
      removeToken();
    }, 0);
  };

  service.getCurrent = function getCurrent() {
    return $q((resolve) => {
      // Get the authentication token if any
      const token = getToken();
      if (!token) {
        // No existing token, not connected
        return resolve(null);
      }
      if (currentUser) {
        // Current user has already been set, return it
        return resolve(currentUser);
      }
      // Get user from saved token
      decodePayload(token).then((payload) => {
        $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, payload);
        currentUser = payload;
        resolve(payload);
      }).catch(() => {
        removeToken();
        resolve(null);
      });
    });
  };

  return service;

  /**
   * Decode and save the received authorization token
   * @param {*} token
   * @return {*}
   */
  function saveToken(token) {
    return $q((resolve, reject) => {
      // Decode token payload before saving it into the cookie
      decodePayload(token).then((payload) => {
        $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, payload);
        localStorageService.set(CONSTANTS.AUTH_TOKEN, token);
        resolve(payload);
      }).catch((err) => {
        removeToken();
        reject(err);
      });
    });
  }

  /**
   * Remove the token stored in the localStorage
   */
  function removeToken() {
    if (currentUser) {
      // Remove jwt token from auth header of all requests made by the $http service
      $http.defaults.headers.common.Authorization = '';
      $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, null);
      currentUser = null;
    }
    localStorageService.remove(CONSTANTS.AUTH_TOKEN);
  }

  /**
   * Return the token stored in the localStorage
   * @return {*}
   */
  function getToken() {
    return localStorageService.get(CONSTANTS.AUTH_TOKEN);
  }

  /**
   * Decode a JWT token payload
   * @param {*} token
   * @return {Promise}
   */
  function decodePayload(token) {
    return $q((resolve, reject) => {
      // Decode the encrypted payload
      const data = token.split('.')[1];
      const payload = JSON.parse(decodeURI(base64ToUTF8(urlBase64Decode(data))));
      // Control the expiration date
      if (Math.round(new Date().getTime() / 1000) <= payload.exp) {
        // Add jwt token to auth header for all requests made by the $http service
        $http.defaults.headers.common.Authorization = `Bearer ${token}`;
        resolve(payload);
      } else {
        reject('Expired');
      }
    });
  }

  /**
   * Decode a JWT token payload
   * @param {*} str
   * @return {*}
   */
  function base64ToUTF8(str) {
    return decodeURIComponent(escape($window.atob(str)));
  }

  /**
   * Decode a JWT token payload
   * @param {*} str
   * @return {*}
   */
  function urlBase64Decode(str) {
    let output = str.replace('-', '+').replace('_', '/');
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
        throw Error('Illegal base64url string!');
    }
    return output;
  }
}