App.LocationController = Ember.Controller.extend({

    isPublic: true,

    // TODO add awesome toggle widget with color if location detected otherwise hide or grey
    isEmpty: true,

    address: null, // TODO replace formatted address string by multiple parts

    latitude: null,
    longitude: null,

    googleMapsApi: null,

    latlng: function() {
        return this.get('latitude') + ',' + this.get('longitude');
    }.property('latitude', 'longitude'),

    needs: ['restaurant'],
    actions: {
        receiveAddress: function(address) {
            this.getLocationByAddress(address);
        }
    },
    getLocationByAddress: function(address) {
        var self = this;
        var geocoder = this.get('googleMapsApi').get('geocoder');
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === self.get('googleMapsApi').get('maps').GeocoderStatus.OK) {
                self.setLocation(results[0]);
                self.get('controllers.restaurant').send('receiveCoordinates', self.get('latlng'));
            } else {
                // TODO error handling
            }
        });
    },
    /**
     * TODO implement
     * @param latitude
     * @param longitude
     */
    getLocationByCoordinates: function(latitude, longitude) {

    },
    setLocation: function(location) {
        this.set('address', location.formatted_address);
        this.set('latitude', location.geometry.location.lat());
        this.set('longitude', location.geometry.location.lng())
    }
});