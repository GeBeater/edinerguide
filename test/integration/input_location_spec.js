QUnit.module('input location integration tests', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
});

QUnit.test('send form data and check presentation', function() {

    Ember.run(function() {
        App.advanceReadiness();
    });
});