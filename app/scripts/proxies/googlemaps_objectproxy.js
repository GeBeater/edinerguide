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

