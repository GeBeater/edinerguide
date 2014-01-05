var google = window.google = {};

google.maps = function() {};
google.maps.Geocoder = function() {
    this.geocode = function() {
        return function() { }
    };
};

$.mockjax({
    url: '*'
});
// TODO dirty hack due to mockjax does not prevent the actual ajax call
$.ajax = function() {};