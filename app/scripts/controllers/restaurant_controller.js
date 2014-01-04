App.RestaurantController = Ember.Controller.extend({

    /**
     * Used to toggle the restaurant (template) visibility.
     */
    isEmpty: true,

    error: 'A restaurant could not be found.',

    id: null,
    name: null,
    location: {"address": null, "postalCode": null, "city": null, "country": null},
    url: null,
    contact: {"phone": null },
    category: null,

    amplify: null,

    needs: ['error'],
    actions: {
        receiveCoordinates: function(latlng) {
            this.findRestaurant(latlng);
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
        var errorMsg = this.get('error');
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