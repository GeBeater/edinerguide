App.IndexController = Ember.Controller.extend({
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
        setLocation: function(location) {
            this.setRestaurant(location);
        }
    },
    setRestaurant: function(location) {
        var restaurantController = this.get('controllers.restaurant');
        amplify.request( "foursquare", { near: location, query: "restaurant", radius: 500, explore: 1 }, function(data) {
            var restaurants = data.response.groups[0].items;
            var restaurant = restaurants[Math.floor(Math.random() * restaurants.length)].venue;
            amplify.request( "foursquare", { id: restaurant.id }, function(data) {
                venue = data.response.venue;
                restaurantController.set('restaurant', data.response.venue);
            });
        });
    }
});