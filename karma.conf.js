//
// https://github.com/yeoman/generator-ember/blob/master/app/templates/karma.conf.js
//
module.exports = function(karma) {
    karma.set({
        basePath: '',

        files: [
          "app/bower_components/jquery/jquery.min.js",
          "app/bower_components/handlebars/handlebars.js",
          "app/bower_components/ember/ember.js",
          "app/bower_components/ember-data-shim/ember-data.js",
          //"app/bower_components/jquery-mockjax/jquery.mockjax.js",
          "app/bower_components/amplify/lib/amplify.js",
          "test/google_maps_stub.js",
          ".tmp/scripts/combined-scripts.js",
          ".tmp/scripts/compiled-templates.js",
          "test/**/*.js"
        ],

        logLevel: karma.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,

        frameworks: ["qunit"],

        plugins: [
            'karma-qunit',
            'karma-phantomjs-launcher'
        ]
    });
};
