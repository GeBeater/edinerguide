var App = window.App = Ember.Application.create();

/* Order and include as you please. */
require('scripts/proxies/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');

App.register('amplify:main', App.AmplifyObjectProxy.create({ global: window }), { instantiate: false, singleton: true });
App.inject('controller:restaurant', 'amplify', 'amplify:main');

App.register('google:main', App.GoogleMapsObjectProxy.create({ global: window, key: 'AIzaSyDuJ0dnvYAHdnKTccoivRQzMfMFmrXw7SY' }), { instantiate: false, singleton: true });
App.inject('controller:location', 'googleMapsApi', 'google:main');
