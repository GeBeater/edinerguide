QUnit.module('controller location unit tests', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
});

QUnit
    .cases([
        // data provider for geographic coordinates (latitude, longtitude)
        { latitude: '49.89881', longtitude: '10.90276', expectedlatlng: '49.89881,10.90276' },
        { latitude: '53.55661', longtitude: '9.98583', expectedlatlng: '53.55661,9.98583' },
        { latitude: '48.13513', longtitude: '11.58198', expectedlatlng: '48.13513,11.58198' }
    ])
    .test('latlng (computed property)', function(coordinates) {

        var location = {
            formatted_address: 'nonsense',
            geometry: {
                location: {
                    lat: function() { return coordinates.latitude },
                    lng: function() { return coordinates.longtitude }
                }
            }
        }

        var objectUnderTest = getLocationController();
        objectUnderTest.setLocation(location);
        var actualLatlng = objectUnderTest.get('latlng');

        equal(actualLatlng, coordinates.expectedlatlng, 'the latlng property does not provide the expected value');
    });

QUnit
    .cases([
        // data provider for addresses
        { expectedAddress: 'Drehbahn 47-48' },
        { expectedAddress: 'Osterstraße, Hamburg' },
        { expectedAddress: 'Bundesstraße, Hamburg, Deutschland' }
    ])
    .test('receiveAddress', function(addresses) {

        var objectUnderTest = getLocationController();

        var getLocationByAddressSpy = sinon.spy();
        sinon.stub(objectUnderTest, 'getLocationByAddress', getLocationByAddressSpy);

        objectUnderTest.send('receiveAddress', addresses.expectedAddress);
        objectUnderTest.getLocationByAddress.restore();

        QUnit.equal(
            getLocationByAddressSpy.calledWith(addresses.expectedAddress),
            true,
            'the address action does not forwared the expected value'
        );
    });

QUnit
    .cases([
        // data provider for information about a restaurant
        {
            formatted_address: 'Drehbahn, 20354 Hamburg, Germany',
            geometry: {
                location: {
                    lat: function() { return 53.5565457 },
                    lng: function() { return 9.986318600000004 }
                }
            }
        },
        {
            formatted_address: 'Platzl 9, 80331 Munich, Germany',
            geometry: {
                location: {
                    lat: function() { return 48.1373073 },
                    lng: function() { return 11.580357000000049 }
                }
            }
        }
    ])
    .test('setLocation', function(location) {

        var objectUnderTest = getLocationController();

        var setSpy = sinon.spy();
        sinon.stub(objectUnderTest, 'set', setSpy);

        objectUnderTest.setLocation(location);
        objectUnderTest.set.restore();

        QUnit.equal(setSpy.callCount, 3, 'the amount of properties settings mismatch the expected');

        QUnit.equal(setSpy.calledWith('address', location.formatted_address), true, 'the address is not set');
        QUnit.equal(setSpy.calledWith('latitude', location.geometry.location.lat()), true, 'the latitude is not set');
        QUnit.equal(setSpy.calledWith('longitude', location.geometry.location.lng()), true, 'the longitude is not set');
    });

QUnit.test('_geocodeCallback in case of successful response data', function() {

    var results = { foo: 'bar' };
    var status = 'OK';
    var expectedStatus = 'OK';

    var resolve = sinon.spy();
    var reject = sinon.spy();

    var deferred = {
        resolve: resolve,
        reject: reject
    };

    var objectUnderTest = getLocationController();
    objectUnderTest._geocodeCallback(results, status, deferred, null, expectedStatus);

    QUnit.equal(resolve.calledOnce, true, "the handler does not set the expected resolve status");
    QUnit.equal(resolve.calledWith(results), true, "the handle does not forward the received results correctly");

    QUnit.equal(reject.callCount, 0, "the handler does unexpected set the reject status");
});

QUnit
    .cases([
        // data provider for failing Geocoder.geocode responses
        { results : { foo: 'bar' }, status: 'FAILED', expectedStatus: 'OK' },
        { results : null, status: 'UNKNOWN', expectedStatus: 'OK' },
        { results : [], status: 'FAILED', expectedStatus: 'OK' }
    ])
    .test('_geocodeCallback in case of failing response data', function(responses) {

        var ERROR = 'any error message';

        var resolve = sinon.spy();
        var reject = sinon.spy();

        var deferred = {
            resolve: resolve,
            reject: reject
        }

        var objectUnderTest = getLocationController();
        objectUnderTest._geocodeCallback(
            responses.results,
            responses.status,
            deferred,
            ERROR,
            responses.expectedStatus
        );

        QUnit.equal(reject.calledOnce, true, "the handler does not set the expected reject status");
        QUnit.equal(reject.calledWith(ERROR), true, "the handle does not forward the received error message correctly");

        QUnit.equal(resolve.callCount, 0, "the handler does unexpected set the resolve status");
    });

QUnit.test('_geocode', function() {

    var PROMISE = 42;
    var STATUS = 'OK';
    var REQUEST = { foo: 'bar' };

    var deferredStub = sinon.stub(Ember.RSVP, 'defer', function() {
        return {
            promise: PROMISE
        };
    });

    var geocodeSpy = sinon.spy();

    var googleMapsApiGetStub = sinon.stub();
    googleMapsApiGetStub.withArgs('geocoder').returns({ geocode: geocodeSpy });
    googleMapsApiGetStub.withArgs('maps').returns({ GeocoderStatus: { OK: STATUS}});

    var objectUnderTest = getLocationController();

    var objectUnderTestGetStub = sinon.stub(objectUnderTest, 'get');
    objectUnderTestGetStub.withArgs('googleMapsApi').returns({ get: googleMapsApiGetStub});

    var actualPromise = objectUnderTest._geocode(REQUEST, null);
    deferredStub.restore();
    objectUnderTestGetStub.restore();

    QUnit.equal(actualPromise, PROMISE, 'does not return the expected promise');
    QUnit.equal(geocodeSpy.calledOnce, true, 'the geocode operation was not called');
    QUnit.equal(geocodeSpy.calledWith(REQUEST), true, 'the request is not forward correctly');
});