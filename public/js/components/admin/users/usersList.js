/* eslint no-undef: "off" */
/* eslint no-underscore-dangle: "off" */

import 'js-marker-clusterer';

import markerImage from '../../../../images/blu-stars.png';
import htmlTemplate from './usersList.html';

MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = 'images/m';

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
      this.markers = [];
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
          this.createMarkers();
          // Set geolocation notification hook
          this.setGeolocationHook();
        });
      });
    };

    this.$onDestroy = () => {
      // Release watch hook if needed
      if (this.watchId) {
        GeolocationService.watchCancel(this.watchId);
        this.watchId = undefined;
      }
      this.destroyMarkers();
    };

    this.setGeolocationHook = () => {
      // Get current location and listen to location changes
      this.watchId = GeolocationService.watchLocation((coords) => {
        // Current location has been updated
        this.current = coords;
        // Update distance of every users
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

    this.createMarkers = () => {
      // Create a marker for every users
      this.users.forEach((user) => {
        if (user.location) {
          const latLng = new google.maps.LatLng(user.location.coordinates[0], user.location.coordinates[1]);
          user.marker = new google.maps.Marker({
            title: user.address,
            position: latLng,
            id: user.id
          });
          // Bind click event on infoWindow
          user.marker.addListener('click', ((item) => {
            return () => {
              self.user = item;
              this.map.showInfoWindow('iw', item.marker);
            };
          })(user));
          // Add marker to the markers list
          this.markers.push(user.marker);
        }
      });
      // Build clusterer from markers list
      this.markerClusterer = new MarkerClusterer(this.map, this.markers, {});
      // Center/zoom map to fit all markers
      this.markerClusterer.fitMapToMarkers();
    };

    this.destroyMarkers = () => {
      // Destroy all users markers
      this.users.forEach((user) => {
        if (user.marker) {
          user.marker.setMap(null);
          user.marker = null;
        }
      });
      // Remove all markers from the clusterer
      this.markerClusterer.clearMarkers();
      // Empty markers list
      this.markers = [];
    };

    this.userLocate = (event, user) => {
      if (user.marker) {
        event.stopPropagation();
        // Center map on the user marker and zoom
        this.map.setCenter(user.marker.getPosition());
        this.map.setZoom(15);
      }
    };
  }
};