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

