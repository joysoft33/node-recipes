import htmlTemplate from './usersList.html';

export default {

  template: htmlTemplate,

  bindings: {
    users: '<'
  },

  controller: function controller(GeolocationService, $log) {
    'ngInject';

    this.$onInit = () => {
      $log.info('usersList component init');

      GeolocationService.getLocation().then((coords) => {
        $log.info('Geolocation:', coords);

        this.users = this.users.map((user) => {

          user.distance = GeolocationService.getDistance(coords, {
            lat: user.location.coordinates[0],
            lng: user.location.coordinates[1]
          }).toFixed(1);

          return user;
        });
      }).catch((err) => {
        $log.debug(err);
      });
    };
  }
};