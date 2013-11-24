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