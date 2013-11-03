//
// https://github.com/yeoman/generator-ember/blob/master/app/templates/karma.conf.js

module.exports = function(karma) {
    karma.set({
        basePath: '',

        files: [
          "app/bower_components/jquery/jquery.min.js",
          "app/bower_components/handlebars/handlebars.js",
          "app/bower_components/ember/ember.js",
          "app/bower_components/ember-data-shim/ember-data.js",
          "app/bower_components/jquery-mockjax/jquery.mockjax.js",
          ".tmp/scripts/combined-scripts.js",
          ".tmp/scripts/compiled-templates.js",
          "tests/**/*.js"
        ],

        logLevel: karma.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,

        frameworks: ["qunit"],

        plugins: [
            'karma-qunit',
            'karma-chrome-launcher',
            'karma-ember-preprocessor',
            'karma-phantomjs-launcher'
        ],

        preprocessors: {
            "**/*.handlebars": 'ember'
        }
    });
};
