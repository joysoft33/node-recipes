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
        $log.info(`main auth: ${user}`);
        this.loggedUser = user;
      });
    };

    this.isLogged = () => this.loggedUser !== null;
    this.isAdmin = () => this.loggedUser && this.loggedUser.isAdmin;
    this.userName = () => (this.loggedUser ? this.loggedUser.name : '');

    this.logout = () => {
      AuthService.logout().then(() => {
        $state.go('main.recipes');
      }).catch(() => {
        $log.debug('Not logged');
      });
    };
  }

};