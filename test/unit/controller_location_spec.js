QUnit.module("controller location unit tests", {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    },
    teardown: function() {
        App.reset();
    }
});

QUnit
    .cases([
        // data provider for geographic coordinates (latitude, longtitude)
        { latitude: '49.89881', longtitude: '10.90276', expectedlatlng: '49.89881,10.90276' },
        { latitude: '53.55661', longtitude: '9.98583', expectedlatlng: '53.55661,9.98583' },
        { latitude: '48.13513', longtitude: '11.58198', expectedlatlng: '48.13513,11.58198' }
    ])
    .test("test latlng (computed property) with valid coordinates", function(coordinates) {

        var location = {
            formatted_address: 'nonsense',
            geometry: {
                location: {
                    lat: function() { return coordinates.latitude },
                    lng: function() { return coordinates.longtitude }
                }
            }
        }

        var controller = getLocationController();
        controller.setLocation(location);
        var actualLatlng = controller.get('latlng');

        equal(actualLatlng, coordinates.expectedlatlng);
    });