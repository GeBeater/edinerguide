module('integration tests', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            // App.deferReadiness();
        });
    },
    teardown: function() {
        $.mockjaxClear();
    }
});

test('the main content value', function() {
    // Ember.run(App, 'advanceReadiness');
    visit("/").then(function() {
        var expectedContent = 'An Informative Tagline Goes Here';
        equal(find(".tagline:contains(" + expectedContent + ")").length, 1, "Could not retrieve the expected content.");
    });
});