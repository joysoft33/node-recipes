import htmlTemplate from './userEdit.html';

export default {

  template: htmlTemplate,

  bindings: {
    user: '<'
  },

  controller: function controller(UsersService, $log, $state) {
    'ngInject';

    const self = this;

    this.$onInit = () => {
      $log.info('userEdit component init');
      this.user.lat = this.user.location.coordinates[0];
      this.user.lng = this.user.location.coordinates[1];
    };

    this.validate = () => {
      this.user.$update().then(() => {
        $state.go('main.users');
      }).catch((err) => {
        $log.error('Error:', err);
      });
    };

    this.onPlaceChanged = function onPlaceChanged() {
      const place = this.getPlace();
      if (place.geometry) {
        self.user.lat = place.geometry.location.lat();
        self.user.lng = place.geometry.location.lng();
      }
    };

  }
};