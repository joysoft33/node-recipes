/* eslint no-undef: "off" */

import markerImage from '../../../../images/blu-stars.png';
import htmlTemplate from './usersList.html';

export default {

  template: htmlTemplate,

  bindings: {
    users: '<'
  },

  controller: function controller(MapsService, GeolocationService, NgMap, $log) {
    'ngInject';

    // Save this for ng-map callbacks
    const self = this;

    this.$onInit = () => {
      $log.info('usersList component init');
      // Set current position marker image url
      this.markerIcon = {
        url: `${markerImage}`
      };
      // Load Google Maps API script
      MapsService.loadGoogleApi().then(() => {
        this.loaded = true;
        // Ok, be notified upon map ready
        NgMap.getMap().then((map) => {
          // Save the map object
          this.map = map;
          // Save each marker in its user object to facilitate hover
          this.saveMarkers();
          // Set geolocation notification hook
          this.setGeolocationHook();
        });
      });
    };

    // Component destroyed
    this.$onDestroy = () => {
      // Release watch hook if needed
      if (this.watchId) {
        GeolocationService.watchCancel(this.watchId);
        this.watchId = undefined;
      }
    };

    this.setGeolocationHook = () => {
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

    // Show user infowindow when marker clicked
    this.showDetails = function showDetails(e, user) {
      self.user = user;
      this.map.showInfoWindow('iw', this);
    };

    // Save marker in each user object for moiuse in/out
    this.saveMarkers = () => {
      this.users.forEach((user) => {
        for (const i in this.map.markers) {
          if (this.map.markers.hasOwnProperty(i)) {
            const marker = this.map.markers[i];
            if (marker.data === user.id) {
              user.marker = marker;
              break;
            }
          }
        }
      });
    };

    // Mouse enter a table user row
    this.userMouseIn = (user) => {
      if (user.marker) {
        // Bounce the corresponding marker
        user.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };

    // Mouse leave a table user row
    this.userMouseOut = (user) => {
      if (user.marker) {
        // Stop marker animation
        user.marker.setAnimation(null);
      }
    };
  }
};