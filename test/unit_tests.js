module("dummy unit tests", {
    setup: function() {
        App.reset();
    }
});
test('1 is equal to 1', function() {
    equal(1, 1, "Find the issue! ;-)");
});
