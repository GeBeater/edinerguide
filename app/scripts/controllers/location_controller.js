App.LocationController = Ember.Controller.extend({

    /**
     * Property which used to toggle the restaurant (template) visibility.
     *
     * @type {boolean}
     */
    isEmpty: true,

    /**
     * The error message if the given location could not determined.
     *
     * @constant
     */
    ERROR: 'A valid location could not be determined.',

    /**
     * The determined address in the format "street, zipcode city, country".
     *
     * @see this.setLocation(location)
     * @type {string}
     */
    address: null,

    /**
     * The determined geographic coordinates.
     *
     * @see this.setLocation(location)
     */
    latitude: null,
    longitude: null,

    /**
     * @see App.GoogleMapsObjectProxy
     */
    googleMapsApi: null,

    /**
     * The latitude and longitude as computed property.
     *
     * To use in the same way as any normal, static property.
     */
    latlng: function() {
        return this.get('latitude') + ',' + this.get('longitude');
    }.property('latitude', 'longitude'),

    /**
     * An array of other controller objects available inside instances of this controller.
     *
     * @see http://emberjs.com/api/classes/Ember.Controller.html#property_needs
     */
    needs: ['restaurant', 'error'],

    /**
     * Entry points to receive events from other components like templates or controller.
     */
    actions: {
        receiveAddress: function(address) {
            this.getLocationByAddress(address);
        }
    },
    /**
     * Setter for location properties.
     *
     * @see https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult
     *
     * @param location
     */
    setLocation: function(location) {
        this.set('address', location.formatted_address);
        this.set('latitude', location.geometry.location.lat());
        this.set('longitude', location.geometry.location.lng());
    },
    /**
     * Callback function which used to process the Geocoder.geocode response.
     *
     * @param request
     * @private
     */
    _geocodeCallback: function(results, status, deferred, error, expectedStatus) {
        if (status === expectedStatus) {
            deferred.resolve(results);
        } else {
            deferred.reject(error);
        }
    },
    /**
     * Geocode an address by given address or latlng.
     *
     * @param request The GeocodeRequest object literal contains address or latlng field.
     * @private
     */
    _geocode: function(request, error) {
        var deferred = Ember.RSVP.defer();
        var geocoder = this.get('googleMapsApi').get('geocoder');
        var expectedStatus = this.get('googleMapsApi').get('maps').GeocoderStatus.OK;
        var self = this;
        geocoder.geocode(request, function (results, status) {
            self._geocodeCallback(results, status, deferred, error, expectedStatus);
        });
        return deferred.promise;
    },
    /**
     * Fetch a location from the Google Maps API V3 by given GeocodeRequest.
     *
     * @param request
     */
    fetchLocation: function(request) {
        var self = this;
        var errorMsg = this.get('ERROR');
        this._geocode(request, errorMsg).then(function(results) {
            self.setLocation(results[0]);
            self.get('controllers.restaurant').send('receiveCoordinates', self.get('latlng'));
            self.set('isEmpty', false);
        }).fail(function(error) {
            self.get('controllers.error').send('receiveError', error);
            self.set('isEmpty', true);
        });
    },
    /**
     * Resolve a location by a given human readable address.
     *
     * @param address
     */
    getLocationByAddress: function(address) {
        this.fetchLocation({ 'address': address });
    },
    /**
     * Resolve a location by a given latitude and longitude.
     *
     * Currently not is use! Prepared for HTML5 Geolocation, coordinates detection.
     *
     * @param latitude
     * @param longitude
     */
    getLocationByCoordinates: function(latitude, longitude) {
        this.fetchLocation({ 'latLng': latitude + ',' + longitude });
    }
});