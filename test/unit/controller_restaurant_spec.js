QUnit.module('controller restaurant unit tests: ', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
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

QUnit.test('_fetchRestaurantsCallback in case of successful response data', function() {


    var ERROR = 'any error message';

    var data = { meta: { code: 200 }, response: { totalResults: 23 } };

    var resolve = sinon.spy();
    var reject = sinon.spy();

    var deferred = {
        resolve: resolve,
        reject: reject
    }

    var objectUnderTest = getRestaurantController();
    objectUnderTest._fetchRestaurantsCallback(
        data,
        deferred,
        ERROR
    );

    QUnit.equal(resolve.calledOnce, true, "the handler does not set the expected resolve status");
    QUnit.equal(resolve.calledWith(data), true, "the handle does not forward the received data correctly")

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
    objectUnderTest._fetchRestaurantsCallback(
        data,
        deferred,
        ERROR
    );

    QUnit.equal(reject.calledOnce, true, "the handler does not set the expected reject status");
    QUnit.equal(reject.calledWith(ERROR), true, "the handle does not forward the received error message correctly")

    QUnit.equal(resolve.callCount, 0, "the handler does unexpected set the resolve status");
});