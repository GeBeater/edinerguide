module("content integration tests", {
    setup: function() {
        App.reset();
        Ember.run(App, App.advanceReadiness);
    },
    teardown: function() {
        App.reset();
    }
});

test('page contains a header container', function() {
    visit("/").then(function() {
        equal(find("#header").length, 1, "could not find the header container");
    });
});

test('header will contain a headline', function() {
    visit("/").then(function() {
        var headline = 'Delegate your restaurant selection!';
        equal(find("#tagline:contains(" + headline + ")").length, 1, "could not retrieve the headline: " + headline);
    });
});

//test('page contains the input component', function() {
//});

//test('page contains the location component', function() {
//});

//test('page contains the restaurant component', function() {
//});