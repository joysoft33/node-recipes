/* eslint no-invalid-this: "0" */
'use strict';

angular.module('recipesApp')

  .service('AuthService', function (CONSTANTS, $http, $q, $timeout, localStorageService, $rootScope, $window) {

    this.currentUser = null;

    this.login = (credential) => $q((resolve, reject) => {
      // Let server authenticate the given email/password
      $http.post(CONSTANTS.AUTH_URL, credential).then((res) => {
        return this.saveToken(res.data.token);
      }).then((user) => {
        this.currentUser = user;
        resolve(this.currentUser);
      }).catch((err) => {
        this.removeToken();
        let message;
        if (err.data) {
          message = typeof err.data === 'string' ? err.data : err.data.message;
        }
        reject(message ? message : err.statusText);
      });
    });

    this.logout = () => $timeout(() => {
      // Just remove the authentication token
      this.removeToken();
    }, 0);

    this.getCurrent = () => $q((resolve, reject) => {
      // Get the authentication token if any
      let token = this.getToken();
      if (!token) {
        // No existing token, not connected
        return resolve(null);
      }
      if (this.currentUser) {
        // Current user has already been set, return it
        return resolve(this.currentUser);
      }
      // Get user from saved token
      this._decodePayload(token).then((payload) => {
        $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, payload);
        this.currentUser = payload;
        resolve(payload);
      }).catch((err) => {
        this.removeToken();
        resolve(null);
      });
    });

    this.setToken = (token) => $q((resolve, reject) => {
      // Decode and save the received token
      this.saveToken(token).then((payload) => {
        // Store the decoded user info
        this.currentUser = payload;
        resolve(payload);
      }).catch((err) => {
        this.removeToken();
        reject(err);
      });
    });

    this.saveToken = (token) => $q((resolve, reject) => {
      // Decode token payload before saving it into the cookie
      this._decodePayload(token).then((payload) => {
        $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, payload);
        localStorageService.set(CONSTANTS.AUTH_TOKEN, token);
        resolve(payload);
      }).catch((err) => {
        this.removeToken();
        reject(err);
      });
    });

    this.removeToken = () => {
      if (this.currentUser) {
        // Remove jwt token from auth header of all requests made by the $http service
        $http.defaults.headers.common.Authorization = '';
        $rootScope.$broadcast(CONSTANTS.AUTH_EVENT, null);
        this.currentUser = null;
      }
      localStorageService.remove(CONSTANTS.AUTH_TOKEN);
    };

    this.getToken = () =>
      localStorageService.get(CONSTANTS.AUTH_TOKEN);

    // Private methods
    this._decodePayload = (token) => $q((resolve, reject) => {
      // Decode the encrypted payload
      let data = token.split('.')[1];
      let payload = JSON.parse(decodeURI(this._base64ToUTF8(this._urlBase64Decode(data))));
      // Control the expiration date
      if (Math.round(new Date().getTime() / 1000) <= payload.exp) {
        // Add jwt token to auth header for all requests made by the $http service
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        resolve(payload);
      } else {
        reject('Expired');
      }
    });

    this._base64ToUTF8 = (str) => {
      return decodeURIComponent(escape($window.atob(str)));
    };

    this._urlBase64Decode = (str) => {
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
    };
  });