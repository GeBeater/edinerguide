var App = window.App = Ember.Application.create();

/* Order and include as you please. */
//require('scripts/controllers/location_controller.js')
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');

App.register('amplify:main', amplify, { instantiate: false, singleton: true });
App.inject('controller:restaurant', 'amplify', 'amplify:main');

App.register('google:main', google, { instantiate: false, singleton: true });
App.inject('controller:location', 'google', 'google:main');
