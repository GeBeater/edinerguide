(function() {

var App = window.App = Ember.Application.create({});

})();
(function() {

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
        Ember.$.ajax({
           url: 'https://maps.googleapis.com/maps/api/js?v=3&key=' + this.key + '&sensor=false&callback=bootstrapGoogleMapsApi',
           dataType: 'script',
           success: function(data, textStatus, jqxhr) {
//               console.log( data ); // Data returned
//               console.log( textStatus ); // Success
//               console.log( jqxhr.status ); // 200
//               console.log( "Load was performed." );
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

    /**
     * Used to toggle the error (template) visibility.
     */
    isEmpty: true,

    error: null,

    actions: {
        receiveError: function(error) {
            this.set('error', error);
            this.set('isEmpty', false);
        },
        resetError: function() {
            this.set('error', null);
            this.set('isEmpty', true);
        }
    }
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

    /**
     * An array of other controller objects available inside instances of this controller.
     *
     * @see http://emberjs.com/api/classes/Ember.Controller.html#property_needs
     */
    needs: ['location', 'error'],

    /**
     * Entry points to receive events from other components like templates or controller.
     */
    actions: {
        sendAddress: function(address) {
            this.get('controllers.error').send('resetError');
            this.get('controllers.location').send('receiveAddress', address);
        }
    }
});

})();

(function() {

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

})();

(function() {

App.RestaurantController = Ember.Controller.extend({

    /**
     * Property which used to toggle the restaurant (template) visibility.
     *
     * @type {boolean}
     */
    isEmpty: true,

    /**
     * The error message if no restaurant was found.
     *
     * @constant
     */
    ERROR: 'A restaurant could not be found.',

    /**
     * The restaurant properties.
     *
     * @see this.setRestaurant(restaurant)
     */
    id: null,
    name: null,
    location: {"address": null, "postalCode": null, "city": null, "country": null},
    url: null,
    contact: {"phone": null },
    category: null,

    /**
     * @see App.AmplifyObjectProxy
     */
    amplify: null,

    /**
     * An array of other controller objects available inside instances of this controller.
     *
     * @see http://emberjs.com/api/classes/Ember.Controller.html#property_needs
     */
    needs: ['error'],

    /**
     * Entry points to receive events from other components like templates or controller.
     */
    actions: {
        receiveCoordinates: function(latlng) {
            this.findRestaurant(latlng);
        }
    },
    /**
     * Setter for restaurant properties.
     *
     * @see https://developer.foursquare.com/docs/responses/venue
     *
     * @param restaurant
     */
    setRestaurant: function(restaurant) {
        this.set('id', restaurant.id);
        this.set('name', restaurant.name);
        this.set('location.address', restaurant.location.address);
        this.set('location.postalCode', restaurant.location.postalCode);
        this.set('location.city', restaurant.location.city);
        this.set('location.country', restaurant.location.country);
        this.set('url', restaurant.url);
        this.set('contact.phone', restaurant.contact.formattedPhone);
        this.set('category', restaurant.categories[0].name);
    },
    /**
     * Creates a Promise object.
     *
     * @see https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/defer.js
     *
     * @returns {*|Promise|Number|number|defer|u.defer}
     * @private
     */
    _createDeferred: function() {
        return Ember.RSVP.defer();
    },
    /**
     * Callback function which used to process the fetchRestaurants response.
     *
     * @param data
     * @param deferred
     * @param error
     * @private
     */
    _fetchRestaurantsCallback: function(data, deferred, error) {
        if((null === data) || (undefined === data.meta) || (undefined === data.meta.code) ||
            (200 !== data.meta.code) || (data.response.totalResults < 1)) {
            // reject
            deferred.reject(error);
        } else {
            // succeed
            deferred.resolve(data);
        }
    },
    /**
     * Call the foursquare API proxy to fetch some restaurants by given latlng.
     *
     * @param latlng
     * @param amplifyProxy
     * @param error
     * @returns {Ember.RSVP.Promise}
     */
    fetchRestaurants: function(latlng, amplifyProxy, error) {
        var deferred = this._createDeferred();
        var query = { "ll": latlng, "query": "restaurant", "radius": 800, "explore": 1 };
        var self = this;
        amplifyProxy.get('request')('foursquare', query, function(data) {
            self._fetchRestaurantsCallback(data, deferred, error);
        });
        return deferred.promise;
    },
    /**
     * Callback function which used to process the fetchRestaurant response.
     *
     * @param data
     * @param deferred
     * @param error
     * @private
     */
    _fetchRestaurantCallback: function(data, deferred, error) {
        if((null === data) || (undefined === data.meta) || (undefined === data.meta.code) ||
            (200 !== data.meta.code)) {
            // reject
            deferred.reject(error);
        } else {
            // succeed
            deferred.resolve(data);
        }
    },
    /**
     * Call the foursquare API proxy to fetch one restaurant specified by id.
     *
     * @param id
     * @param amplifyProxy
     * @param error
     * @returns {Ember.RSVP.Promise}
     */
    fetchRestaurant: function(id, amplifyProxy, error) {
        var deferred = this._createDeferred();
        var self = this;
        amplifyProxy.get('request')('foursquare', { id: id }, function(data) {
            self._fetchRestaurantCallback(data, deferred, error);
        });
        return deferred.promise;
    },
    /**
     * Fetch a random restaurant from foursquare API based on given latlng.
     *
     * @param latlng comma separated latitude and longitude
     */
    findRestaurant: function(latlng) {
        var self = this;
        var amplify = this.get('amplify');
        var errorMsg = this.get('ERROR');
        this.fetchRestaurants(latlng, amplify, errorMsg).then(function(restaurantsJson) {
                // use a random restaurant item from the first group
                var restaurants = restaurantsJson.response.groups[0].items;
                var restaurant = restaurants[Math.floor(Math.random() * restaurants.length)].venue;

                return self.fetchRestaurant(restaurant.id, amplify, errorMsg);
        }).then(function(restaurantJson) {
                self.setRestaurant(restaurantJson.response.venue);
                self.set('isEmpty', false);
        }).fail(function(error) {
                self.get('controllers.error').send('receiveError', error);
                self.set('isEmpty', true);
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