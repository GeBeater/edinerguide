QUnit.module('imprint integration test', {
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

    visit('/imprint').then(function() {

        QUnit.equal(
            find(".col-lg-12:first h2:contains('Imprint')").length,
            1,
            'headline not found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(0):contains('According to § 5 Telemediengesetz (TMG):')").length,
            1,
            'TMG (law) remark not found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(1):contains('Bernd Hoffmann')").length,
            1,
            'name not found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(2):contains('Geisbergblick 1')").length,
            1,
            'street not found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(3):contains('96123 Litzendorf')").length,
            1,
            'city and zipcode not found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(4):contains('Germany')").length,
            1,
            'city found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(5):contains('Chief Content Officer according to § 55 Abs. 2 RStV:')").length,
            1,
            'RStV (law) remark not found'
        );

        QUnit.equal(
            find(".col-lg-12:first p:eq(6):contains('as stated above')").length,
            1,
            'CCO reference not found'
        );
    });
});