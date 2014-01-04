QUnit.module("Integration Tests", {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
});

QUnit.test("first test", function() {

    ok(true, 'something before app is initialized');

    Ember.run(function() {
        App.advanceReadiness();
    });

    visit("/imprint").then(function() {
        var actualRows = find(".container").length;
        QUnit.equal(actualRows, 3, 'the imprint page does not contain enought container elements');
    });

    ok(true, 'something after app is initialized');
});

QUnit.test("second test", function() {

    ok(true, 'something before app is initialized');

    Ember.run(function() {
        App.advanceReadiness();
    });

    visit("/imprint").then(function() {
        var actualRows = find(".container").length;
        QUnit.equal(actualRows, 3, 'the imprint page does not contain enought container elements');
    });

    ok(true, 'something after app is initialized');
});