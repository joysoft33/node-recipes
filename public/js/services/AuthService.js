'use strict';

angular.module('recipesApp')

  .factory('AuthService', function (CONSTANTS, $http, $q, $timeout, localStorageService, $rootScope, $window) {

    let currentUser = null;
    let service = {};

    service.login = function (credential) {
      return $q((resolve, reject) => {
        // Let server authenticate the given email/password
        $http.post(CONSTANTS.AUTH_URL, credential).then((res) => {
          return _saveToken(res.data.token);
        }).then((user) => {
          currentUser = user;
          resolve(currentUser);
        }).catch((err) => {
          _removeToken();
          let message;
          if (err.data) {
            message = typeof err.data === 'string' ? err.data : err.data.message;
          }
          reject(message ? message : err.statusText);
        });
      });
    };

    service.logout = function () {
      return $timeout(() => {
        // Just remove the authentication token
        _removeToken();
      }, 0);
    };

    service.getCurrent = function () {
      return $q((resolve, reject) => {
        // Get the authentication token if any
        let token = _getToken();
        if (!token) {
          // No existing token, not connected
          return resolve(null);
        }
        if (currentUser) {
          // Current user has already been set, return it
          return resolve(currentUser);
        }
        // Get user from saved token
        _decodePayload(token).then((payload) => {
          $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, payload);
          currentUser = payload;
          resolve(payload);
        }).catch((err) => {
          _removeToken();
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
    function _saveToken(token) {
      return $q((resolve, reject) => {
        // Decode token payload before saving it into the cookie
        _decodePayload(token).then((payload) => {
          $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, payload);
          localStorageService.set(CONSTANTS.AUTH_TOKEN, token);
          resolve(payload);
        }).catch((err) => {
          _removeToken();
          reject(err);
        });
      });
    }

    /**
     * Remove the token stored in the localStorage
     */
    function _removeToken() {
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
    function _getToken() {
      return localStorageService.get(CONSTANTS.AUTH_TOKEN);
    }

    /**
     * Decode a JWT token payload
     * @param {*} token
     * @return {Promise}
     */
    function _decodePayload(token) {
      return $q((resolve, reject) => {
        // Decode the encrypted payload
        let data = token.split('.')[1];
        let payload = JSON.parse(decodeURI(_base64ToUTF8(_urlBase64Decode(data))));
        // Control the expiration date
        if (Math.round(new Date().getTime() / 1000) <= payload.exp) {
          // Add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.common.Authorization = 'Bearer ' + token;
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
    function _base64ToUTF8(str) {
      return decodeURIComponent(escape($window.atob(str)));
    }

    /**
     * Decode a JWT token payload
     * @param {*} str
     * @return {*}
     */
    function _urlBase64Decode(str) {
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
  });