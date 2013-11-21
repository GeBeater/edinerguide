App.IndexController = Ember.Controller.extend({
    init: function() {
        amplify.request.define( "foursquare", "ajax", {
            url: "http://api.edinerguide.de/foursquare",
            dataType: "json",
            type: "GET"
        });
    },
    actions: {
        setLocation: function(location) {
            this.fetchRestaurants(location);
        }
    },
    fetchRestaurants: function(location) {
        amplify.request( "foursquare", { near: location, section: "food", radius: 500, limit: 10 }, function(data) {
            var restaurants = data.response.venues;
            var restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
            alert(restaurant.name + ', ' + restaurant.location.address + ', ' + restaurant.location.city);
        });
    }
});