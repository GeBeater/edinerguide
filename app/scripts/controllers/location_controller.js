App.LocationController = Ember.Controller.extend({

    // TODO add awesome toggle widget with color if location detected otherwise hide or grey
    isEmpty: true,

    address: null, // TODO replace formatted address string by multiple parts

    latitude: null,
    longitude: null,

    google: null,
    geocoder: null,

    latlng: function() {
        return this.get('latitude') + ',' + this.get('longitude');
    }.property('latitude', 'longitude'),

    init: function() {
        this._super();
        var google = this.get('google');
        this.set('geocoder', new google.maps.Geocoder());
    },
    needs: ['restaurant'],
    actions: {
        receiveAddress: function(address) {
            this.getLocationByAddress(address);
        }
    },
    getLocationByAddress: function(address) {
        var controller = this;
        var google = this.get('google');
        var geocoder = this.get('geocoder');

        this.get('geocoder').geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("result: ", results);
                console.log("results 0: ", results[0]);

                controller.setLocation(results[0]);
                controller.get('controllers.restaurant').send('receiveCoordinates', controller.get('latlng'));
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