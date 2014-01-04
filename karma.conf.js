//
// https://github.com/yeoman/generator-ember/blob/master/app/templates/karma.conf.js
//
module.exports = function(config) {

    config.set({
        basePath: '',

        files: [
            <!-- Application dependencies -->
            "app/bower_components/jquery/jquery.min.js",
            "app/bower_components/handlebars/handlebars.js",
            "app/bower_components/ember/ember.js",
            "app/bower_components/amplify/lib/amplify.js",

            <!-- Developer tools dependencies -->
            "app/bower_components/jquery-mockjax/jquery.mockjax.js",
            "node_modules/qunit-parameterize/qunit-parameterize.js",


            <!-- Application init -->
            ".tmp/scripts/init-scripts.js",

            <!-- Test Helper -->
            "test/google_maps_stub.js",
            "test/test_helper.js",

            <!-- Application -->
            ".tmp/scripts/combined-scripts.js",
            ".tmp/scripts/compiled-templates.js",

            <!-- Integration tests -->
            "test/integration/**/*_spec.js",

            <!-- Unit tests -->
            "test/unit/**/*_spec.js"

        ],

        // Level of logging. Possible values are:
        //
        // * LOG_DISABLE
        // * LOG_ERROR
        // * LOG_WARN
        // * LOG_INFO
        // * LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        browsers: ['PhantomJS'],

        // Continuous Integration mode.
        // If it's `true`, then it captures browsers, runs the tests and exits.
        singleRun: true,

        // Enable / disable watching files and executing tests whenever any of them
        // changes.
        autoWatch: false,

        frameworks: ["qunit", "sinon"],

        plugins: [
            'karma-qunit',
            'karma-sinon',
            'karma-phantomjs-launcher'
        ]
    });
};