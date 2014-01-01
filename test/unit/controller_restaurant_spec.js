QUnit.module("controller restaurant unit tests: ", {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    },
    teardown: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
});

QUnit.test("fetchRestaurants in case of success", function() {

    // define amplify to response valid data
    amplify.request.define( "foursquare", function ( settings ) {
        settings.success(
            { meta: { code: 200 }, response: { totalResults: 23 } }
        );
    });

    var amplifyProxy = Ember.ObjectProxy.create({
        content: amplify
    });

    var resolve = sinon.spy();
    var reject = sinon.spy();

    var stub = sinon.stub(Ember.RSVP, 'defer', function() {
        return {
            promise: 42,
            resolve: resolve,
            reject: reject
        }
    });

    var deferredTest = Ember.RSVP.defer();

    var controller = getRestaurantController();

    var actualPromise = controller.fetchRestaurants("any latlng", amplifyProxy, "any error message");

    QUnit.equal(actualPromise, 42, "the promise does not provide the expected value");
    // TODO does not work as expected ; seem to ignor actual call
    //QUnit.equal(resolve.calledOnce, true, "the handler does not set the expected resolve status");
    //QUnit.equal(reject.callCount, 0, "the handler does unexpected set the reject status");
});