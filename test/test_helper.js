var testing = function(){
    var helper = {
        container: function(){
            return App.__container__;
        },
        controller: function( name ){
            return helper.container().lookup('controller:' + name);
        },
        path: function(){
            return helper.controller('application').get('currentPath');
        }
    };
    return helper;
};

Ember.Test.registerHelper('path', function() {
    return testing().path();
});

// TODO checke whether registerAsyncHelper is required
Ember.Test.registerHelper('getLocationController', function() {
    return testing().controller('location');
});

// move app to an element on the page in order to see the app running inside the runner
document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

App.rootElement = '#ember-testing';

// common test setup
App.setupForTesting();
App.injectTestHelpers();