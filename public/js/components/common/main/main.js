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
    this.isOwnerOrAdmin = userId => this.loggedUser && (this.loggedUser.isAdmin || this.loggedUser.id === userId);

    this.logout = () => {
      AuthService.logout().then(() => {
        $state.go('main');
      }).catch(() => {
        $log.debug('Not logged');
      });
    };
  }

};