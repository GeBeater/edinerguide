/**
 * TODO remove due to this is an kind of experimental playground
 */
module("register and inject third party libraries", {
    setup: function() {
        Ember.run(App, App.advanceReadiness);
    }
});

test( "there is only one google object instancse", function() {
    expect( 1 );

    var container = App.__container__;
    var p1 = container.lookup( 'controller:location' );
    var before = container.lookup( 'google:main' );
    var p2 = container.lookup( 'controller:location' );
    var after = container.lookup( 'google:main' );

    equal( before, after, "the google instances are not the same (non singleton)" );
});