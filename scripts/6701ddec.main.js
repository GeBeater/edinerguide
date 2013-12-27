(function() {

var App = window.App = Ember.Application.create({});

/* Order and include as you please. */


})();

(function() {

App.AmplifyObjectProxy = Ember.ObjectProxy.extend({

    content: null,

    global: null,

    init: function() {
        this._super();
        this.set('content', this.get('global').amplify);
        this.get('request').define( "foursquare", "ajax", {
            url: "http://api.edinerguide.de/foursquare",
            dataType: "json",
            type: "GET"
        });

    }
});

})();

(function() {

App.GoogleMapsObjectProxy = Ember.ObjectProxy.extend({

    content: null,

    global: null,

    key: null,

    geocoder: null,

    init: function() {
        this._super();
        var self = this;
        this.global.bootstrapGoogleMapsApi = function() {
            self.bootstrap();
        };
        jQuery.getScript('https://maps.googleapis.com/maps/api/js?v=3&key=' + this.key + '&sensor=false&callback=bootstrapGoogleMapsApi', function( data, textStatus, jqxhr ) {
            if ('success' !== textStatus) {
                // TODO error handling
            }
        });
    },
    bootstrap: function() {
       var global = this.get('global');
       this.set('content', global.google);
       var geocoder = new global.google.maps.Geocoder();
       this.set('geocoder', geocoder);
    }
});



})();

(function() {

App.AboutController = Ember.Controller.extend({

});

})();

(function() {

App.DisclaimerController = Ember.Controller.extend({

});

})();

(function() {

App.ErrorController = Ember.Controller.extend({

    // TODO add awesome toggle widget with color (red) if an error triggered otherwise hide
    isEmpty: true

});

})();

(function() {

App.ImprintController = Ember.Controller.extend({

});

})();

(function() {

App.IndexController = Ember.Controller.extend({

});

})();

(function() {

App.InputController = Ember.Controller.extend({

    latitude: null,
    longitude: null,

    needs: ['location'],
    actions: {
        sendAddress: function(address) {
            this.get('controllers.location').send('receiveAddress', address);
        },
        detectLocation: function() {
            // TODO implementation
            // this.get('controllers.location').send('detectLocation');
        }
    }
});

})();

(function() {

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

})();

(function() {

App.RestaurantController = Ember.Controller.extend({

    // TODO add awesome toggle widget with color if restaurant filled otherwise hide or grey
    isEmpty: true,

    id: null,
    name: null,
    location: {"address": null, "postalCode": null, "city": null, "country": null},
    url: null,
    contact: {"phone": null },
    category: null,

    amplify: null,

    actions: {
        receiveCoordinates: function(latlnt) {
            this.findRestaurant(latlnt);
        }
    },
    setRestaurant: function(restaurant) {
        this.set('id', restaurant.id);
        this.set('name', restaurant.name);
        this.set('location.address', restaurant.location.address);
        this.set('location.postalCode', restaurant.location.postalCode);
        this.set('location.city', restaurant.location.city);
        this.set('location.country', restaurant.location.country);
        this.set('url', restaurant.url);
        this.set('category', restaurant.categories[0].name);
    },
    /**
     * Fetch a random restaurant from foursquare API based on given latitude and longtitude.
     *
     * TODO add error handling
     *
     * @param latlng comma separated latitude and longitude
     */
    findRestaurant: function(latlng) {
        var query = { "ll": latlng, "query": "restaurant", "radius": 500, "explore": 1 };
        var controller = this;
        var amplify = this.get('amplify');
        this.get('amplify').get('request')( "foursquare", query, function(data) {
            var restaurants = data.response.groups[0].items;
            var restaurant = restaurants[Math.floor(Math.random() * restaurants.length)].venue;
            amplify.get('request')( "foursquare", { id: restaurant.id }, function(data) {
                controller.setRestaurant(data.response.venue);
            });
        });
    }
});

})();

(function() {

App.ApplicationRoute = Ember.Route.extend({

});


})();

(function() {

App.Router.map(function () {
    this.route('about');
    this.route('imprint');
    this.route('disclaimer');
});


})();

(function() {

App.register('amplify:main', App.AmplifyObjectProxy.create({ global: window }), { instantiate: false, singleton: true });
App.inject('controller:restaurant', 'amplify', 'amplify:main');

App.register('google:main', App.GoogleMapsObjectProxy.create({ global: window, key: 'AIzaSyDuJ0dnvYAHdnKTccoivRQzMfMFmrXw7SY' }), { instantiate: false, singleton: true });
App.inject('controller:location', 'googleMapsApi', 'google:main');


})();