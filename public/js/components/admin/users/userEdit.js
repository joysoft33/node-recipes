import htmlTemplate from './userEdit.html';

export default {

  template: htmlTemplate,

  bindings: {
    user: '<'
  },

  controller: function controller(MapsService, UsersService, $log, $state) {
    'ngInject';

    // Save this for ng-map callbacks
    const self = this;

    this.$onInit = () => {
      $log.info('userEdit component init');
      // Load Google Maps API script
      MapsService.loadGoogleApi().then(() => {
        this.user.lat = this.user.location.coordinates[0];
        this.user.lng = this.user.location.coordinates[1];
        this.loaded = true;
        // Be notified when place has changed (save this)
        this.onPlaceChanged = function onPlaceChanged() {
          const place = this.getPlace();
          if (place.geometry) {
            self.user.lat = place.geometry.location.lat();
            self.user.lng = place.geometry.location.lng();
          }
        };
      });
    };

    this.validate = () => {
      this.user.$update().then(() => {
        $state.go('main.users');
      }).catch((err) => {
        $log.error('Error:', err);
      });
    };

  }
};