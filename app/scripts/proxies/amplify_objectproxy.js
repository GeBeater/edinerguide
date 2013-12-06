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