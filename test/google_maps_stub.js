var google = window.google = {};

google.maps = function() {};
google.maps.Geocoder = function() {
    this.geocode = function() {
        return function() { }
    };
};
