GoogleMapsObjectProxy = Ember.ObjectProxy.extend({

    content: null,

    geocoder: null,

    key: 'AIzaSyDuJ0dnvYAHdnKTccoivRQzMfMFmrXw7SY',

    getGeocoder: function() {
        if (null === this.geocoder) {
            var maps = this.get('maps');
            this.geocoder = new maps.Geocoder();
        }
        return this.geocoder;
    },

    init: function() {
        this._super();
        var self = this;
        jQuery.getScript('http://maps.googleapis.com/maps/api/js?key=' + this.key + '&sensor=false', function( data, textStatus, jqxhr ) {
            if ('success' === textStatus) {
                self.set('content', google);
            }

//            console.log( data ); // Data returned
//            console.log( textStatus ); // Success
//            console.log( jqxhr.status ); // 200
//            console.log( "Load was performed." );
        });
    }

});

