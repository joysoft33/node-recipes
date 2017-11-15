'use strict';

angular.module('recipesApp')

  .factory('CheckRouteService', function (AuthService, $log, $q, $transitions) {

    let service = {};

    service.initialize = function () {
      // Check ui-router transitions
      $transitions.onBefore({}, service.check);
    };

    service.check = function (transition) {

      // Get the requested route
      let to = transition.to();

      if (!to.publicRoute) {
        // The destination route is marked as private
        return $q((resolve) => {
          // Get the currently connected user
          AuthService.getCurrent().then((user) => {
            if (user) {
              // A user is connected
              $log.debug(`${to.url} authenticated`);
              resolve();
            } else {
              // User isn’t authenticated
              $log.debug(`${to.url} need authentication`);
              // Redirect to login page
              resolve(transition.router.stateService.target('main.login', {
                redirect: to.name
              }));
            }
          });
        });
      }
    };

    return service;
  });