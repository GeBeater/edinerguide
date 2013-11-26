(function() {

var App = window.App = Ember.Application.create();

/* Order and include as you please. */


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

    init: function() {
        this._super();
        this.get('amplify').request.define( "foursquare", "ajax", {
            url: "http://api.edinerguide.de/foursquare",
            dataType: "json",
            type: "GET"
        });
    },
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
        this.get('amplify').request( "foursquare", query, function(data) {
            var restaurants = data.response.groups[0].items;
            var restaurant = restaurants[Math.floor(Math.random() * restaurants.length)].venue;
            amplify.request( "foursquare", { id: restaurant.id }, function(data) {
                controller.setRestaurant(data.response.venue);
            });
        });
    }
});

})();

(function() {

App.Store = DS.Store.extend();
App.ApplicationAdapter = DS.FixtureAdapter;


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

App.register('amplify:main', amplify, { instantiate: false, singleton: true });
App.inject('controller:restaurant', 'amplify', 'amplify:main');

App.register('google:main', google, { instantiate: false, singleton: true });
App.inject('controller:location', 'google', 'google:main');


})();