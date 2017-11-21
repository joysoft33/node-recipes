export default authConfig;

/**
 * Configure the authentication system
 * @param {*} $httpProvider
 * @param {*} jwtOptionsProvider
 */
function authConfig($httpProvider, jwtOptionsProvider) {
  'ngInject';

  jwtOptionsProvider.config({

    unauthenticatedRedirectPath: '/login',

    unauthenticatedRedirector: function redirector($state) {
      'ngInject';

      $state.go('main.login');
    },

    tokenGetter: function tokenGetter(AuthService) {
      'ngInject';

      return AuthService.getToken();
    }
  });

  $httpProvider.interceptors.push('jwtInterceptor');
}
