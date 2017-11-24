import htmlTemplate from './main.html';

export default {

  template: htmlTemplate,

  bindings: {
    loggedUser: '<'
  },

  controller: function controller(AuthService, CONSTANTS, $log, $state, $scope) {
    'ngInject';

    this.$onInit = () => {

      $log.info('main component init');

      $scope.$on(CONSTANTS.AUTH_EVENT, (msg, user) => {
        this.loggedUser = user || undefined;
        $log.info('main auth:', user);
      });
    };

    this.isLogged = () => typeof this.loggedUser !== 'undefined';
    this.isAdmin = () => this.isLogged() && this.loggedUser.isAdmin;
    this.userName = () => (this.isLogged() ? this.loggedUser.name : '');

    this.logout = () => {
      AuthService.logout().then(() => {
        $state.go('main.recipes');
      }).catch(() => {
        $log.debug('Not logged');
      });
    };
  }

};