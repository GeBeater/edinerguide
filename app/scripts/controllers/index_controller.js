App.IndexController = Ember.Controller.extend({
    latitude: null,
    longitude: null,
    init: function() {
        this._super();
        amplify.request.define( "foursquare", "ajax", {
            url: "http://api.edinerguide.de/foursquare",
            dataType: "json",
            type: "GET"
        });
    },
    needs: ['restaurant'],
    actions: {
        submitLocation: function(location, coordinates) {
            this.setRestaurant(location);
        },
        detectPosition: function() {
            this.setPosition();
        }
    },
    setRestaurant: function(location, coordinates) {
        var restaurantController = this.get('controllers.restaurant');
        var query = null;
        if(true === coordinates) {
            query = { ll: location, query: "restaurant", radius: 500, explore: 1 }
        } else {
            query = { near: location, query: "restaurant", radius: 500, explore: 1 }
        }
        amplify.request( "foursquare", query, function(data) {
            var restaurants = data.response.groups[0].items;
            var restaurant = restaurants[Math.floor(Math.random() * restaurants.length)].venue;
            amplify.request( "foursquare", { id: restaurant.id }, function(data) {
                venue = data.response.venue;
                restaurantController.set('restaurant', data.response.venue);
            });
        });
    },
    setPosition: function() {
        var indexController = this;
        navigator.geolocation.getCurrentPosition(
            function(position) {
                indexController.set('latitude', position.coords.latitude);
                indexController.set('longitude', position.coords.longitude);
                indexController.setRestaurant(
                    position.coords.latitude + ',' + position.coords.longitude, true
                );
            },
            function(error) {
                // TODO
            }
        );
    }
});