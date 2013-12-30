App.InputController = Ember.Controller.extend({

    latitude: null,
    longitude: null,

    needs: ['location', 'error'],
    actions: {
        sendAddress: function(address) {
            this.get('controllers.error').send('resetError');
            this.get('controllers.location').send('receiveAddress', address);
        },
        detectLocation: function() {
            // TODO implementation
            // this.get('controllers.location').send('detectLocation');
        }
    }
});