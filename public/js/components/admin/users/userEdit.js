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
        if (this.user.location) {
          this.user.lat = this.user.location.coordinates[0];
          this.user.lng = this.user.location.coordinates[1];
          this.formatPosition();

          UsersService.findAround({
            lat: this.user.lat,
            lng: this.user.lng,
            radius: 500,
            limit: 100
          }).$promise.then((users) => {
            $log.info('Users around', users);
          }).catch((err) => {
            $log.info('Users around error', err);
          });

        }
        this.loaded = true;
        // Be notified when place has changed (save this)
        this.onPlaceChanged = function onPlaceChanged() {
          const place = this.getPlace();
          if (place.geometry) {
            self.user.lat = place.geometry.location.lat();
            self.user.lng = place.geometry.location.lng();
            self.formatPosition();
          }
        };
      });
    };

    this.formatPosition = () => {
      this.position = `${this.user.lat}, ${this.user.lng}`;
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