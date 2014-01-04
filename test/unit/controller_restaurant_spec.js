QUnit.module('controller restaurant unit tests: ', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
});

QUnit
    .cases([
        // data provider for geographic coordinates (latitude and longtitude)
        { expectedlatlng: '49.89881,10.90276' },
        { expectedlatlng: '53.55661,9.98583' },
        { expectedlatlng: '48.13513,11.58198' }
    ])
    .test('receiveCoordinates', function(coordinates) {

        var objectUnderTest = getRestaurantController();

        var findRestaurantSpy = sinon.spy();
        sinon.stub(objectUnderTest, 'findRestaurant', findRestaurantSpy);

        objectUnderTest.send('receiveCoordinates', coordinates.expectedlatlng);
        objectUnderTest.findRestaurant.restore();

        QUnit.equal(
            findRestaurantSpy.calledWith(coordinates.expectedlatlng),
            true,
            'the coordinates action does not forwared the expected value'
        );
    });

QUnit
    .cases([
        // data provider for information about a restaurant
        {
            id: '1337',
            name: 'Villa KunterBunt',
            location: {
                address: 'Hamburger Berg 31',
                postalCode: '20359',
                city: 'Hamburg',
                country: 'Germany'
            },
            url: 'http://TBD',
            contact: {
                formattedPhone: 'TBD'
            },
            categories: [ {name: 'kleine gemuetliche Kneipe'} ]
        }
    ])
    .test('setRestaurant', function(restaurant) {

        var objectUnderTest = getRestaurantController();

        var setSpy = sinon.spy();
        sinon.stub(objectUnderTest, 'set', setSpy);

        objectUnderTest.setRestaurant(restaurant);
        objectUnderTest.set.restore();

        QUnit.equal(setSpy.callCount, 9, 'the amount of properties settings mismatch the expected');

        QUnit.equal(setSpy.calledWith('id', restaurant.id), true, 'the id is not set');
        QUnit.equal(setSpy.calledWith('name', restaurant.name), true, 'the name is not set');
        QUnit.equal(setSpy.calledWith('location.address', restaurant.location.address), true, 'the address is not set');
        QUnit.equal(setSpy.calledWith('location.postalCode', restaurant.location.postalCode), true, 'the postalCode is not set');
        QUnit.equal(setSpy.calledWith('location.city', restaurant.location.city), true, 'the city is not set');
        QUnit.equal(setSpy.calledWith('location.country', restaurant.location.country), true, 'the country is not set');
        QUnit.equal(setSpy.calledWith('url', restaurant.url), true, 'the url is not set');
        QUnit.equal(setSpy.calledWith('contact.phone', restaurant.contact.formattedPhone), true, 'the phone is not set');
        QUnit.equal(setSpy.calledWith('category', restaurant.categories[0].name), true, 'the category is not set');
    });

QUnit.test('_createDeferred', function() {

    var objectUnderTest = getRestaurantController();

    var deferredSpy = sinon.spy();
    var stub = sinon.stub(Ember.RSVP, 'defer', function() {
        return deferredSpy;
    });

    var actualDeferred = objectUnderTest._createDeferred();
    stub.restore();

    QUnit.strictEqual(actualDeferred, deferredSpy, 'the deferred object is not the expected object');
});

QUnit.test('_fetchRestaurantsCallback in case of successful response data', function() {

    var data = { meta: { code: 200 }, response: { totalResults: 23 } };

    var resolve = sinon.spy();
    var reject = sinon.spy();

    var deferred = {
        resolve: resolve,
        reject: reject
    }

    var objectUnderTest = getRestaurantController();
    objectUnderTest._fetchRestaurantsCallback(data, deferred, null);

    QUnit.equal(resolve.calledOnce, true, "the handler does not set the expected resolve status");
    QUnit.equal(resolve.calledWith(data), true, "the handle does not forward the received data correctly");

    QUnit.equal(reject.callCount, 0, "the handler does unexpected set the reject status");
});

QUnit
    .cases([
        // data provider for failing foursquare API responses
        { meta: { code: 200 }, response: { totalResults: 0 } },
        { meta: { code: 500 } },
        {}
    ])
    .test('_fetchRestaurantsCallback in case of failing response data', function(data) {

    var ERROR = 'any error message';

    var resolve = sinon.spy();
    var reject = sinon.spy();

    var deferred = {
        resolve: resolve,
        reject: reject
    }

    var objectUnderTest = getRestaurantController();
    objectUnderTest._fetchRestaurantsCallback(data, deferred, ERROR);

    QUnit.equal(reject.calledOnce, true, "the handler does not set the expected reject status");
    QUnit.equal(reject.calledWith(ERROR), true, "the handle does not forward the received error message correctly");

    QUnit.equal(resolve.callCount, 0, "the handler does unexpected set the resolve status");
});

QUnit.test('fetchRestaurants in case of success', function() {

    var LATLNG = 'any latlng';

    var amplifyMock = sinon.mock(amplify);
    amplifyMock.expects('request').once().withArgs(
        'foursquare', { "ll": LATLNG, "query": "restaurant", "radius": 800, "explore": 1 }
    );

    var amplifyProxy = Ember.ObjectProxy.create({
        content: amplify
    });

    var objectUnderTest = getRestaurantController();

    sinon.stub(objectUnderTest, '_createDeferred', function() {
        return {
            promise: 42,
            resolve: function() {}
        }
    });

    var actualPromise = objectUnderTest.fetchRestaurants(LATLNG, amplifyProxy, "any error message");

    QUnit.equal(actualPromise, 42, "the promise does not provide the expected value");

    amplifyMock.verify();
});

QUnit.test('_fetchRestaurantCallback in case of successful response data', function() {

    var data = { meta: { code: 200 } };

    var resolve = sinon.spy();
    var reject = sinon.spy();

    var deferred = {
        resolve: resolve,
        reject: reject
    }

    var objectUnderTest = getRestaurantController();
    objectUnderTest._fetchRestaurantCallback(data, deferred, null);

    QUnit.equal(resolve.calledOnce, true, "the handler does not set the expected resolve status");
    QUnit.equal(resolve.calledWith(data), true, "the handle does not forward the received data correctly");

    QUnit.equal(reject.callCount, 0, "the handler does unexpected set the reject status");
});

QUnit
    .cases([
        // data provider for failing foursquare API responses
        { meta: { code: 404 } },
        { meta: { code: 500 } },
        {}
    ])
    .test('_fetchRestaurantCallback in case of failing response data', function(data) {

        var ERROR = 'any error message';

        var resolve = sinon.spy();
        var reject = sinon.spy();

        var deferred = {
            resolve: resolve,
            reject: reject
        }

        var objectUnderTest = getRestaurantController();
        objectUnderTest._fetchRestaurantCallback(data, deferred, ERROR);

        QUnit.equal(reject.calledOnce, true, "the handler does not set the expected reject status");
        QUnit.equal(reject.calledWith(ERROR), true, "the handle does not forward the received error message correctly");

        QUnit.equal(resolve.callCount, 0, "the handler does unexpected set the resolve status");
    });

QUnit.test('fetchRestaurant in case of success', function() {

    var ID = '1337';

    var amplifyMock = sinon.mock(amplify);
    amplifyMock.expects('request').once().withArgs(
        'foursquare', { "id": ID }
    );

    var amplifyProxy = Ember.ObjectProxy.create({
        content: amplify
    });

    var objectUnderTest = getRestaurantController();

    sinon.stub(objectUnderTest, '_createDeferred', function() {
        return {
            promise: 42,
            resolve: function() {}
        }
    });

    var actualPromise = objectUnderTest.fetchRestaurant(ID, amplifyProxy, "any error message");

    QUnit.equal(actualPromise, 42, "the promise does not provide the expected value");

    amplifyMock.verify();
});

QUnit.test('findRestaurant (without callback functionality)', function() {

    var LATLNG = '42,1337';

    var objectUnderTest = getRestaurantController();

    var amplify = objectUnderTest.get('amplify');
    var error = objectUnderTest.get('error');

    var stub = sinon.stub(objectUnderTest, 'fetchRestaurants', function() {
        return {
            then: function() {
                return {
                    then: function() {
                        return {
                            fail: function() {}
                        };
                    }
                };
            }
        };
    });

    objectUnderTest.findRestaurant(LATLNG);

    QUnit.equal(stub.calledWith(LATLNG, amplify, error), true, 'the method does not forwared the expected params');
});