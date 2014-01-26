QUnit.module('imprint integration tests', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
});

QUnit.test('check content', function() {

    Ember.run(function() {
        App.advanceReadiness();
    });

    visit('/about').then(function() {

        QUnit.equal(
            find(".col-lg-12:first h2:contains('About')").length,
            1,
            'headline not found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(0):contains('Coming soon!')").length,
            1,
            '"Coming soon" remark not found'
        );

    });
});