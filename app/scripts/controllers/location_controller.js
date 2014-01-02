App.LocationController = Ember.Controller.extend({

    // TODO add awesome toggle widget with color if location detected otherwise hide or grey
    isEmpty: true,

    error: 'A valid location could not be determined.',

    address: null, // TODO replace formatted address string by multiple parts

    latitude: null,
    longitude: null,

    googleMapsApi: null,

    latlng: function() {
        return this.get('latitude') + ',' + this.get('longitude');
    }.property('latitude', 'longitude'),

    needs: ['restaurant', 'error'],
    actions: {
        receiveAddress: function(address) {
            this.getLocationByAddress(address);
        }
    },
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
     * Geocode an address by given address or latlng
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
        this._geocode(request, this.error).then(function(results) {
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