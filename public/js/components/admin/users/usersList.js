/* eslint no-undef: "off" */

import markerImage from '../../../../images/blu-stars.png';
import htmlTemplate from './usersList.html';

export default {

  template: htmlTemplate,

  bindings: {
    users: '<'
  },

  controller: function controller(GeolocationService, NgMap, $log) {
    'ngInject';

    this.$onInit = () => {
      $log.info('usersList component init');
      this.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBopffGiLTFpAlVwUFnsyqde9BnEYxEvIw';
      this.markerIcon = {
        url: `${markerImage}`
      };
    };

    this.onMapLoaded = (map) => {
      // Save the map object
      this.map = map;
      // Place map markers and update map center
      this.centerMap();
      // Get current location and listen to location changes
      this.watchId = GeolocationService.watchLocation((coords) => {
        // Current location has been updated
        this.current = coords;
        this.users.forEach((user) => {
          user.distance = GeolocationService.getDistance(coords, {
            lat: user.location.coordinates[0],
            lng: user.location.coordinates[1]
          }).toFixed(1);
        });
      });
      // No geoloc on the client browser ?
      if (!this.watchId) {
        this.error = 'Browser does not supports HTML5 geolocation';
      }
    };

    this.$onDestroy = () => {
      if (this.watchId) {
        GeolocationService.watchCancel(this.watchId);
        this.watchId = undefined;
      }
    };

    this.centerMap = () => {
      const bounds = new google.maps.LatLngBounds();
      this.users.forEach((user) => {
        const latlng = new google.maps.LatLng(user.location.coordinates[0], user.location.coordinates[1]);
        bounds.extend(latlng);
      });
      this.map.setCenter(bounds.getCenter());
      this.map.fitBounds(bounds);
    };
  }
};